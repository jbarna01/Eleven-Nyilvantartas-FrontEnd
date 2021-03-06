import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar as __MatSnackBar} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef as __MatDialogRef} from '@angular/material/dialog';
import {Operator as __Operator} from '../../../../api/nyilvantartas/models/Operator';
import {GlobalsService as __GlobalsService} from '../../../../api/nyilvantartas/services/globals.service';
import {OperatorService as __OperatorService} from '../../../../api/nyilvantartas/services/operator.service';

@Component({
  selector: 'app-jelszo-modositas',
  templateUrl: './jelszoModositas.component.html',
  styleUrls: ['./jelszoModositas.component.css']})

export class JelszoModositasComponent implements OnInit {
  _felhasznaloJoga: string;
  _operator: __Operator;
  _belepettFelhasznaloId: number;
  _aktualisJelszo: string = null;
  _ujJelszo1: string = null;
  _ujJelszo2: string = null;
  private _dialogRef: __MatDialogRef<JelszoModositasComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) private operator: __Operator,
              private operatorService: __OperatorService,
              private global: __GlobalsService,
              private snackBar: __MatSnackBar,
              private dialogRef: __MatDialogRef<JelszoModositasComponent>) {
    this._operator = operator;
    this._dialogRef = dialogRef;
  }

  ngOnInit() {
    this.global._belepettFelhasznaloJoga.subscribe(felhasznaloJoga => this._felhasznaloJoga = felhasznaloJoga.toString());
    this.global._felhasznaloId.subscribe(felhasznalId => this._belepettFelhasznaloId = parseInt(felhasznalId.toString(), 10));

  }

  /**
   * A jelszó mentését indítja.
   * Első lépésben a megkötéseket ellenörzi le, majd utána történik a jelszó mentése.
   */
  jelszoMentese() {
    if (this.aktualisJelszoEllenorzese(this._aktualisJelszo) && this.ujJelszoEllenorzese(this._ujJelszo1, this._ujJelszo2)) {
      // this.ujJelszoMentese();
    }
  }

  /**
   * Ellenörzi, hogy a megadott aktuális jelszó helyes-e!
   * @param aktualisJelszo, az űrlapon megadott aktuális jelszó.
   */
  private aktualisJelszoEllenorzese(aktualisJelszo: string): boolean {
    if (this._felhasznaloJoga === 'ADMIN' && (this._operator.id !== this._belepettFelhasznaloId)) {
      return true;
    }
    if (this._operator.password === aktualisJelszo) {
      return true;
    } else {
      this.uzenetek('Hibás jelszavat adott meg!');
      this._aktualisJelszo = null;
      return false;
    }
  }

  /**
   * Az új jelszavak ellenörzését végzi.
   * Egyezni kell a két jelszónak, és minimum 6 karakter hosszúnak kell lennie!
   */
  private ujJelszoEllenorzese(ujJelszo1: string, ujJelszo2: string): boolean {
    if (ujJelszo1.length < 6) {
      this.uzenetek('Az új jelszónak minimum 6 karakter hosszúnek kell lennie!');
      this._ujJelszo1 = null;
      this._ujJelszo2 = null;
    } else if (ujJelszo1 === ujJelszo2) {
      return true;
    } else {
      this.uzenetek('Az új jelszavak nem egyeznek meg!');
      this._ujJelszo1 = null;
      this._ujJelszo2 = null;
      return false;
    }
  }

  /**
   * Kiírja az uzenet változóban lévő üzenetett a képernyőre.
   * 2 másodperc múlva autómatikusan eltünteti!
   */
  private uzenetek(uzenet: string) {
    this.snackBar.open(uzenet, 'Bezár')._dismissAfter(2000);
  }

}
