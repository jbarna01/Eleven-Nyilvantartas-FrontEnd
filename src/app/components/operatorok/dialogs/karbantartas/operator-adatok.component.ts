import {Component, Inject, OnInit} from '@angular/core';
import {Operator, Operator as __Operator} from "../../../../models/Operator";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {JelszoModositasComponent} from "../jelszoModositas/jelszoModositas.component";
import {GlobalsService} from "../../../../services/globals.service";
import {OperatorService} from "../../../../services/operator.service";
import {JogokService} from "../../../../services/jogok.service";
import {Jogok} from "../../../../models/Jogok";
import {MatTableDataSource} from "@angular/material/table";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-operator-adatok',
  templateUrl: './operator-adatok.component.html',
  styleUrls: ['./operator-adatok.component.css']
})
export class OperatorAdatokComponent implements OnInit {

  private _operator: __Operator;
  private _felhasznaloJoga: string;
  private _aktualisJog: string;
  private _jogokLista: Jogok[];
  private _jog: Jogok = new Jogok();
  private _jelszoModositasUzenet: string;
  private _ujOperator: boolean;
  private _ujJelszo1: string;
  private _ujJelszo2: string;
  private _params: HttpParams;

  constructor(@Inject(MAT_DIALOG_DATA) private operator: __Operator,
              private __operatorService: OperatorService,
              private __jogokService: JogokService,
              private __router: Router,
              private __global: GlobalsService,
              private __dialog: MatDialog) {
    this._operator = operator;
    this._ujOperator = this._operator.id == null;
  }
  ngOnInit() {
    this.__global._felhasznaloJoga.subscribe(felhasznaloJoga => this._felhasznaloJoga = felhasznaloJoga.toString());
    this.felhasznaloiJogokBeolvasas();
  }

  /**
   * Az összes használható felhasználójogot beolvassa.
   */
  felhasznaloiJogokBeolvasas() {
    if (this._felhasznaloJoga === 'ADMIN') {
      this._aktualisJog = this._operator.jogok[0].id;
      this.__jogokService.getJogok().subscribe( jogok => {
        this._jogokLista = jogok;
      });
    }
  }

  /**
   * Megjeleníti a jelszóváltoztató ablakot.
   * @param operator
   */
  jelszoValtoztatasDialogusAblakMegnyitasa(operator: __Operator) {
    let dialogRef = this.__dialog.open(JelszoModositasComponent, {data: operator, disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
     result.data?this._jelszoModositasUzenet = '#':null;
    })
  }

  /**
   * Operátor adatok mentése.
   */
  operatorMentese() {
    if (this.mezokEllenorzese()) {
      this._params = this.setParameters(this._aktualisJog);
      this.__jogokService.getJogGET(this._params).subscribe(jog => {
        console.log('jog ******************* jog');
        console.log(jog);
        console.log('jog ******************* jog');
        console.log(jog);
        this._jog = jog
        this._operator.jogok[0] = this._jog;
        console.log('oper ------------------------------------');
        console.log(this._operator);
        console.log('oper ------------------------------------');
        this.__operatorService.updateOperatorPUT(this.operator).subscribe(operator => {
          this._operator = operator;
          console.log(this._operator)});
      });
    }
  }

  /**
   * Mentés előtt az operátor adatainak ellenörzése.
   * Nem lehet null a következők:
   *
   */
  private mezokEllenorzese(): boolean {
    return true;
  }

  private setParameters(id: string): HttpParams {
    const params = new HttpParams()
      .set('id', id);
    return params;
  }
}
