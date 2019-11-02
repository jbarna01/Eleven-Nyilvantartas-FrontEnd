import {Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { JelszoModositasComponent } from "../jelszoModositas/jelszoModositas.component";
import { GlobalsService } from "../../../../api/nyilvantartas/services/globals.service";
import { OperatorService } from "../../../../api/nyilvantartas/services/operator.service";
import { JogokService } from "../../../../api/nyilvantartas/services/jogok.service";
import { Jogok } from "../../../../api/nyilvantartas/models/Jogok";
import { HttpParams } from "@angular/common/http";
import { Operator, Operator as __Operator } from "../../../../api/nyilvantartas/models/Operator";
import { OperatorCreateModel } from "../../../../api/nyilvantartas/models/operator-create-model";

@Component({
  selector: 'app-operator-adatok',
  templateUrl: './operator-adatok.component.html',
  styleUrls: ['./operator-adatok.component.css']
})
export class OperatorAdatokComponent implements OnInit {

  private _operator: __Operator;
  private _felhasznaloJoga: string;
  private _aktualisJog: number;
  private _jogokLista: Jogok[];
  private _jog: Jogok = new Jogok();
  private _ujOperator: boolean;
  private _aktivFelhasznalo: boolean;
  private _ujJelszo1: string;
  private _ujJelszo2: string;
  private _params: HttpParams;
  private _disabled: boolean;
  private _jelszoModositasUzenet: string;

  constructor(@Inject(MAT_DIALOG_DATA) private operator: __Operator,
              private __operatorService: OperatorService,
              private __jogokService: JogokService,
              private __router: Router,
              private __global: GlobalsService,
              private __dialog: MatDialog) {
    if (operator.id == null) {
      this._ujOperator = true;
      this._operator = new __Operator();
    } else {
      this._ujOperator = false;
      this._operator = operator;
    }
  }

  ngOnInit() {
    this.__global._belepettFelhasznaloJoga.subscribe(felhasznaloJoga => this._felhasznaloJoga = felhasznaloJoga.toString());
    this._aktivFelhasznalo = this._operator.aktiv == 'A' ? true : false;
    this._disabled = this._felhasznaloJoga === 'ADMIN' ? false : true;
    if (this._ujOperator) { this.mezokUritese(); }
    this.felhasznaloiJogokBeolvasas();
  }

  /**
   * Az összes használható felhasználójogot beolvassa.
   */
  felhasznaloiJogokBeolvasas() {
    if (this._felhasznaloJoga === 'ADMIN') {
      if (!this._ujOperator) {
        this._aktualisJog = this._operator.jogok.id;}
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
      this._params = this.setParameters(this._aktualisJog.toString());
      this.__jogokService.getJogGET(this._params).subscribe(jog => {
        this._jog = jog
        const model = this.operatorCreateRequestModel();
        if (this._ujOperator) {
          this.__operatorService.saveOperatorPOST(model).subscribe(operator => {
            console.log(operator);
            this._operator = (<Operator>operator);
          });
        } else {
          this._operator.jogok = this._jog;
          this._operator.aktiv = this._aktivFelhasznalo ? 'A' : 'P';
          this.__operatorService.updateOperatorPUT( {id: this._operator.id.toString(), request: model}).subscribe(operator => {
            this._operator = (<Operator>operator);
          });
        }
      });
    }
  }

  /**
   * Összeállítja a POST és a PUT Rest híváshoz az Opertátor objektúmot.
   */
  private operatorCreateRequestModel(): OperatorCreateModel {
    return {
      id: this.operator.id,
      vezetekNev: this._operator.vezetekNev,
      keresztNev: this._operator.keresztNev,
      username: this._operator.username,
      password: (this._ujOperator? this._ujJelszo1 : this._operator.password),
      aktiv: (this._ujOperator? 'A' : (this._aktivFelhasznalo ? 'A' : 'P')),
      jogok: this._jog
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

  private mezokUritese() {
    this._operator.vezetekNev = '';
    this._operator.keresztNev = '';
    this._operator.username = '';
    this._ujJelszo1 = '';
  }


  /**
   * Beállítja a hívásokhoz szükséges PATH paramétereket állítja be.
   * @param id
   */
  private setParameters(id: string): HttpParams {
    const params = new HttpParams()
      .set('id', id);
    return params;
  }
}
