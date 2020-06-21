import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog as __MatDialog} from '@angular/material/dialog';
import {MatSnackBar as __MatSnackBar} from '@angular/material/snack-bar';
import {Router as __Router} from '@angular/router';
import {Operator as __Operator} from '../../api/nyilvantartas/models/Operator';
import {GlobalsService as __GlobalsService} from '../../api/nyilvantartas/services/globals.service';
import {OperatorService as __OperatorService} from '../../api/nyilvantartas/services/operator.service';
import {OperatorAdatokComponent as __OperatorAdatokComponent} from './dialogs/karbantartas/operator-adatok.component';

@Component({
  selector: 'app-operatorok',
  templateUrl: './operatorok.component.html',
  styleUrls: ['./operatorok.component.css']})

export class OperatorokComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  _operatorokLista =  new MatTableDataSource<__Operator>();
  _isBelepve: boolean;
  _felhasznaloJoga: string;
  _displayedHeadColums: string[] = ['vezeteknev', 'keresztnev', 'username', 'szerepkor', 'aktiv', 'edit', 'delete'];
  _displayedRowColums: string[] = ['vezeteknev', 'keresztnev', 'username', 'szerepkor', 'aktiv', 'edit', 'delete'];
  private _felhasznaloId: string;

  private _operatorok = [] as any;

  constructor(private __operatorService: __OperatorService,
              private __global: __GlobalsService,
              private __snackBar: __MatSnackBar,
              private __router: __Router,
              private __dialog: __MatDialog) { }

  /**
   * Ellenörzi, vhogy van-e belépet felhasználó.
   * Amennyiben nincs meghívja a operatorLista-t feltöltő metódust.
   */
  ngOnInit() {
    this.__global._isBelepve.subscribe(isBelepve => this._isBelepve = isBelepve);
    if (!this._isBelepve) {
      this.__router.navigate(['']);
    } else {
        this.operatorListaFeltoltese();
    }
  }

  /**
   * Annak fügvényében tölti az operatoLista-t, hogy a belépet felhasználó
   * ADMIN vagy nem. Nem ADMIN felhasználó esetén csak a belépet felhasználó adatait adja vissza.
   */
  private operatorListaFeltoltese() {
    this.__global._belepettFelhasznaloJoga.subscribe(felhasznaloJoga => this._felhasznaloJoga = felhasznaloJoga.toString());
    if (this._felhasznaloJoga === 'ADMIN') {
      this.__operatorService.getAllOperatorokGET().subscribe(response => {
        if (response.status.toUpperCase() === 'OK') {
          this._operatorokLista = new MatTableDataSource(response.data);
          this._operatorokLista.sort = this.sort;
          this._operatorokLista.paginator = this.paginator;
        } else {
          this.uzenetek('Nem lehet a felhasználó listát betölteni', 3000);
        }
      }) ;
    } else {
      this.__global._felhasznaloId.subscribe(felhasznalId => this._felhasznaloId = felhasznalId.toString());
      this.__operatorService.getOperatorGET({id: this._felhasznaloId.toString()}).subscribe(response => {
        if (response.status.toUpperCase() === 'OK') {
          this._operatorok.push(response);
          this._operatorokLista = new MatTableDataSource(this._operatorok);
          this._operatorokLista.sort = this.sort;
        } else {
          this.uzenetek('Nem lehet a felhasználó listát betölteni', 3000);
        }
      });
    }
  }

  /**
   * Táblázat szűrő mezőjének metódusa.
   */
  private applyFilter(filterValue: string) {
    this._operatorokLista.filter = filterValue.trim().toLowerCase();
  }

  private ujOperatorFelvetele() {
    const dialogRefUj = this.__dialog.open(__OperatorAdatokComponent, {data: new __Operator()});

    dialogRefUj.afterClosed().subscribe(result => {
      if (result) {
        this.operatorListaFeltoltese();
      }
    });
  }

  /**
   * A kiválasztott operátor adatait jeleníti meg.
   */
  private operatorKarbantartasa(_operator: __Operator) {
    const dialogRef = this.__dialog.open(__OperatorAdatokComponent, {data: _operator});

    dialogRef.afterClosed().subscribe(result => {
      this.operatorListaFeltoltese();
    });
  }

  /**
   * A váltózóban kapott üzenetett kiírja a képernyőre
   * @param uzenet a kiírandó üzenet.
   * @param autoBezar ennyi idő után az üzenet automatikusan bezáródik.
   */
  private uzenetek(uzenet: string, autoBezar: number) {
    return this.__snackBar.open(uzenet, 'Bezár', {duration: autoBezar} );
  }
}
