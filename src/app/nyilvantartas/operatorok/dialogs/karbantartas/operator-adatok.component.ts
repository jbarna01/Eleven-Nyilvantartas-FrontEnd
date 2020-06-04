import {Component, Inject, OnInit, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {MatSnackBar as __MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Jogok as __Jogok} from '../../../../api/nyilvantartas/models/Jogok';
import { Operator as __Operator} from '../../../../api/nyilvantartas/models/Operator';
import { OperatorCreateModel } from '../../../../api/nyilvantartas/models/operator-create-model';
import { GlobalsService } from '../../../../api/nyilvantartas/services/globals.service';
import { JogokService } from '../../../../api/nyilvantartas/services/jogok.service';
import { OperatorService } from '../../../../api/nyilvantartas/services/operator.service';
import { JelszoModositasComponent } from '../jelszoModositas/jelszoModositas.component';

@Component({
  selector: 'app-operator-adatok',
  templateUrl: './operator-adatok.component.html',
  styleUrls: ['./operator-adatok.component.css']})

export class OperatorAdatokComponent implements OnInit {

  _operator: __Operator;
  _felhasznaloJoga: string;
  _aktualisJog: number;
  _jogokLista: __Jogok[];
  _ujOperator: boolean;
  _aktivFelhasznalo: boolean;
  _ujJelszo1: string;
  _ujJelszo2: string;
  _disabled: boolean;
  _jelszoModositasUzenet: string;
  _nemMentheto = false;
  private _jog = [] as any;
  private _mentettUsername: string;
  private _egyediUsername = true;

  constructor(@Inject(MAT_DIALOG_DATA) private operator: __Operator,
              private __operatorService: OperatorService,
              private __jogokService: JogokService,
              private __router: Router,
              private snackBar: __MatSnackBar,
              private __global: GlobalsService,
              private __dialog: MatDialog) {
    if (operator.id == null) {
      this._ujOperator = true;
      this._operator = new __Operator();
    } else {
      this._ujOperator = false;
      this._operator = operator;
      this._mentettUsername = operator.username;
    }
  }

  ngOnInit() {
    this.__global._belepettFelhasznaloJoga.subscribe(felhasznaloJoga => this._felhasznaloJoga = felhasznaloJoga.toString());
    this._aktivFelhasznalo = this._operator.status === 'A' ? true : false;
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
        this._aktualisJog = this._operator.jogok.id; }
      this.__jogokService.getJogokGET().subscribe(jogok => {
        this._jogokLista = jogok.data;
      });
    }
  }

  /**
   * Megjeleníti a jelszóváltoztató ablakot.
   */
  jelszoValtoztatasDialogusAblakMegnyitasa(operator: __Operator) {
    const dialogRef = this.__dialog.open(JelszoModositasComponent, {data: operator, disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
     // result.data ? this._jelszoModositasUzenet = '#' : null;
    });
  }

  /**
   * Operátor adatok mentése.
   */
  operatorMentese() {
    this.userneveEllenorzes();
    if (this._egyediUsername) {
      if (this.mezokEllenorzese()) {
        // this._params = this.setParameters(this._aktualisJog.toString());
        this.__jogokService.getJogGET({id: this._aktualisJog.toString()}).subscribe(jog => {
          this._jog = jog;
          const model = this.operatorCreateRequestModel();
          if (this._ujOperator) {
            this.__operatorService.saveOperatorPOST(model).subscribe(operator => {
              console.log(operator);
              // this._operator = (<__Operator>operator);
            });
          } else {
            this._operator.jogok = this._jog;
            this._operator.status = this._aktivFelhasznalo ? 'A' : 'P';
            // this.__operatorService.updateOperatorPUT({id: this._operator.id.toString(), request: model}).subscribe(operator => {
            //   this._operator = (<__Operator>operator);
            // });
          }
        });
      }
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
      password: (this._ujOperator ? this._ujJelszo1 : this._operator.password),
      status: (this._ujOperator ? 'A' : (this._aktivFelhasznalo ? 'A' : 'P')),
      jogok: this._jog };
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

  private userneveEllenorzes() {
    // let checkOperator: any;
    const checkUsername = this._operator.username;
    const checkId = this._operator.id.toString();
    // let ujUsername = false;
    // this.__operatorService.getUsernameGET({username: checkUsername}).subscribe(operator => {
    //   checkOperator = operator;
    //   if (checkOperator != null) {
    //     if (checkOperator.id.toString() !== checkId) {
    //       this._egyediUsername = false;
    //       this._nemMentheto = true;
    //       this.uzenetek('Az felhasználónév már foglalt!');
    //       if (this._ujOperator) {
    //         this._operator.username = '';
    //       } else {
    //         this._operator.username = this._mentettUsername;
    //       }
    //     } else {
    //       this._egyediUsername = true;
    //       this._nemMentheto = false;
    //     }
    //   } else {
    //     this._egyediUsername = true;
    //     this._nemMentheto = false;
    //     ujUsername = true;
    //   }
    // });
  }

  private disableMentes() {
    this._nemMentheto = true;
  }
  /**
   * Kiírja az uzenet változóban lévő üzenetett a képernyőre.
   * 2 másodperc múlva autómatikusan eltünteti!
   * @param uzenet, a kiírandó üzenet.
   */
  private uzenetek(uzenet: string) {
    this.snackBar.open(uzenet, 'Bezár')._dismissAfter(2000);
  }
}
