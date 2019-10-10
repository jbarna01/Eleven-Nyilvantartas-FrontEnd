import { Component, OnInit, ViewChild } from '@angular/core';
import {Operator} from "../../models/Operator";
import {OperatorService} from "../../services/operator.service";
import {GlobalsService} from "../../services/globals.service";
import {Router} from "@angular/router";
import {MatTableDataSource, MatSort, MatPaginator} from "@angular/material";
import {MatDialog} from "@angular/material/dialog";
import {OperatorTorlesComponent} from "./dialogs/torles/operator-torles.component";
import {OperatorAdatokComponent} from "./dialogs/karbantartas/operator-adatok.component";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-operatorok',
  templateUrl: './operatorok.component.html',
  styleUrls: ['./operatorok.component.css']
})
export class OperatorokComponent implements OnInit {

  operatorokLista =  new MatTableDataSource<Operator>();
  isBelepve: boolean;
  _operatorok = [] as any;
  _felhasznaloId: string;
  _felhasznaloJoga: string;
  _params: HttpParams;
  displayedHeadColums: string[] = ['id', 'vezeteknev', 'keresztnev', 'username', 'password', 'aktiv', 'edit', 'delete'];
  displayedRowColums: string[] = ['id', 'vezeteknev', 'keresztnev', 'username', 'password', 'aktiv', 'edit', 'delete'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private operatorService: OperatorService,
              private global: GlobalsService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.global._isBelepve.subscribe(isBelepve => this.isBelepve = isBelepve)
    if (!this.isBelepve) {
      this.router.navigate(['']);
    } else {
        this.operatorListaFeltoltese();
    }
  }

  private operatorListaFeltoltese() {
    this.global._felhasznaloJoga.subscribe(felhasznaloJoga => this._felhasznaloJoga = felhasznaloJoga.toString());
    if (this._felhasznaloJoga === 'ADMIN') {
      this.operatorService.getOperatorok().subscribe(operatorok => {
        this.operatorokLista = new MatTableDataSource(operatorok);
        this.operatorokLista.sort = this.sort;
        this.operatorokLista.paginator = this.paginator;
      }) ;
    } else {
      this.global._felhasznaloId.subscribe(felhasznalId => this._felhasznaloId = felhasznalId.toString());
      this._params = this.setParameters(this._felhasznaloId);
      this.operatorService.getOperator(this._params).subscribe( operatorok => {
        this._operatorok.push(operatorok);
        this.operatorokLista = new MatTableDataSource(this._operatorok);
        this.operatorokLista.sort = this.sort;
      });
    }
  }

  /**
   * Táblázat szűrő mezőjének metódusa.
   * @param filterValue
   */
  private applyFilter(filterValue: string) {
    this.operatorokLista.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Megjeleníti az operátor törlés megerősítéséhez szükséges dialóg ablakot.
   * @param _operator
   */
  private operatorTorlese(_operator: Operator) {
    let dialogRef = this.dialog.open(OperatorTorlesComponent, {data: _operator});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialaog válasz: ${result}`);
    })
  }

  /**
   * A kiválasztott operátor adatait jeleníti meg.
    * @param _operator
   */
  private operatorKarbantartasa(_operator: Operator) {
    let dialogRef = this.dialog.open(OperatorAdatokComponent, {data: _operator});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialaog válasz: ${result}`);
    })
  }

  private setParameters(id: string): HttpParams {
    const params = new HttpParams()
      .set('id', id);
    return params;
  }
}
