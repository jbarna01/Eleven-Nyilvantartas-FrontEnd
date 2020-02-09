import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from "@angular/material";
import {OperatorTorlesComponent} from "./dialogs/torles/operator-torles.component";
import {OperatorAdatokComponent} from "./dialogs/karbantartas/operator-adatok.component";
import {MatDialog} from "@angular/material/dialog";
import {GlobalsService as __GlobalsService} from "../../api/nyilvantartas/services/globals.service";
import {HttpParams as __HttpParams} from "@angular/common/http";
import {Operator as __Operator} from "../../api/nyilvantartas/models/Operator";
import {Router as __Router} from "@angular/router";

import {OperatorService as __OperatorService} from "../../api/nyilvantartas/services/operator.service";

@Component({
  selector: 'app-operatorok',
  templateUrl: './operatorok.component.html',
  styleUrls: ['./operatorok.component.css']
})
export class OperatorokComponent implements OnInit {

  _operatorokLista =  new MatTableDataSource<__Operator>();
  _isBelepve: boolean;
  private _operatorok = [] as any;
  private _felhasznaloId: string;
  _felhasznaloJoga: string;
  private _params: __HttpParams;
  _displayedHeadColums: string[] = ['vezeteknev', 'keresztnev', 'username', 'szerepkor', 'aktiv', 'edit', 'delete'];
  _displayedRowColums: string[] = ['vezeteknev', 'keresztnev', 'username', 'szerepkor', 'aktiv', 'edit', 'delete'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private operatorService: __OperatorService,
              private global: __GlobalsService,
              private router: __Router,
              private dialog: MatDialog) { }

  /**
   * Ellenörzi, vhogy van-e belépet felhasználó.
   * Amennyiben nincs meghívja a operatorLista-t feltöltő metódust.
   */
  ngOnInit() {
    this.global._isBelepve.subscribe(isBelepve => this._isBelepve = isBelepve)
    if (!this._isBelepve) {
      this.router.navigate(['']);
    } else {
        this.operatorListaFeltoltese();
    }
  }

  /**
   * Annak fügvényében tölti az operatoLista-t, hogy a belépet felhasználó
   * ADMIN vagy nem. Nem ADMIN felhasználó esetén csak a belépet felhasználó adatait adja vissza.
   */
  private operatorListaFeltoltese() {
    this.global._belepettFelhasznaloJoga.subscribe(felhasznaloJoga => this._felhasznaloJoga = felhasznaloJoga.toString());
    if (this._felhasznaloJoga === 'ADMIN') {
      this.operatorService.getAllOperatorokGET().subscribe(operatorok => {
        this._operatorokLista = new MatTableDataSource(operatorok);
        this._operatorokLista.sort = this.sort;
        this._operatorokLista.paginator = this.paginator;
      }) ;
    } else {
      this.global._felhasznaloId.subscribe(felhasznalId => this._felhasznaloId = felhasznalId.toString());
      this.operatorService.getOperatorGET({id: this._felhasznaloId.toString()}
      ).subscribe(operatorok => {
        this._operatorok.push(operatorok);
        this._operatorokLista = new MatTableDataSource(this._operatorok);
        this._operatorokLista.sort = this.sort;
      });
    }
  }

  /**
   * Táblázat szűrő mezőjének metódusa.
   * @param filterValue
   */
  applyFilter(filterValue: string) {
    this._operatorokLista.filter = filterValue.trim().toLowerCase();
  }

  ujOperatorFelvetele() {
    let dialogRefUj = this.dialog.open(OperatorAdatokComponent, {data: new __Operator()});

    dialogRefUj.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  /**
   * Megjeleníti az operátor törlés megerősítéséhez szükséges dialóg ablakot.
   * @param _operator
   */
  operatorTorlese(_operator: __Operator) {
    let dialogRef = this.dialog.open(OperatorTorlesComponent, {data: _operator});

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  /**
   * A kiválasztott operátor adatait jeleníti meg.
    * @param _operator
   */
  operatorKarbantartasa(_operator: __Operator) {
    let dialogRef = this.dialog.open(OperatorAdatokComponent, {data: _operator});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialaog válasz: ${result}`);
    })
  }
}
