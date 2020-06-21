import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef as __MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar as __MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Jogok as __Jogok} from '../../../../api/nyilvantartas/models/Jogok';
import {Operator as __Operator} from '../../../../api/nyilvantartas/models/Operator';
import {GlobalsService} from '../../../../api/nyilvantartas/services/globals.service';
import {JogokService} from '../../../../api/nyilvantartas/services/jogok.service';
import {OperatorService} from '../../../../api/nyilvantartas/services/operator.service';
import {OperatorokComponent as __OperatorokComponent} from '../../operatorok.component';
import {JelszoModositasComponent} from '../jelszoModositas/jelszoModositas.component';

@Component({
  selector: 'app-operator-adatok',
  templateUrl: './operator-adatok.component.html',
  styleUrls: ['./operator-adatok.component.css']})

export class OperatorAdatokComponent implements OnInit {

  _operator: __Operator;
  _felhasznaloJoga: string;
  _aktualisJog: __Jogok;
  _jogokLista: __Jogok[];
  _ujOperator: boolean;
  _aktivFelhasznalo: boolean;
  _ujJelszo1: string;
  _ujJelszo2: string;
  _disabled: boolean;
  _jelszoModositasUzenet: string;
  _nemMentheto = true;
  private _jog = [] as any;
  private _mentettUsername: string;
  private _egyediUsername = true;
  private _dialogRef: __MatDialogRef<__OperatorokComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) private operator: __Operator,
              private __operatorService: OperatorService,
              private __jogokService: JogokService,
              private __router: Router,
              private __snackBar: __MatSnackBar,
              private __global: GlobalsService,
              private __dialog: MatDialog,
              private __dialogRef: __MatDialogRef<__OperatorokComponent>) {
    this._dialogRef = __dialogRef;
    if (operator.id == null) {
      this._ujOperator = true;
      this._operator = new __Operator();
    } else {
      this._ujOperator = false;
      this._operator = operator;
      this._ujJelszo1 = this._operator.password;
      this._mentettUsername = operator.username;
    }
  }

  ngOnInit() {
    this.__global._belepettFelhasznaloJoga.subscribe(felhasznaloJoga => this._felhasznaloJoga = felhasznaloJoga.toString());
    this._aktivFelhasznalo = this._operator.status === 'A';
    this._disabled = this._felhasznaloJoga === 'ADMIN';
    if (this._ujOperator) {
      this.mezokUritese();
    }
    this.felhasznaloiJogokBeolvasas();
  }

  /**
   * Az összes használható felhasználójogot beolvassa.
   */
  felhasznaloiJogokBeolvasas() {
    if (this._felhasznaloJoga === 'ADMIN') {
      if (!this._ujOperator) {
        this._aktualisJog = this._operator.jogok;
      }
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
    // this.userneveEllenorzes();
    if (this._egyediUsername) {
      if (this.mezokEllenorzese()) {
        this._operator.password = this._ujJelszo1;
        this._operator.status = this._ujOperator ? 'A' : (this._aktivFelhasznalo ? 'A' : 'P');
        this._operator.jogok = this._aktualisJog;
        this.__operatorService.saveOperatorPOST(this._operator).subscribe(operator => {
            this._dialogRef.close({data: operator});
        });

      }
    }
  }

  private megseClick() {
    this._dialogRef.close({data: null});
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
    this._nemMentheto = false;
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
