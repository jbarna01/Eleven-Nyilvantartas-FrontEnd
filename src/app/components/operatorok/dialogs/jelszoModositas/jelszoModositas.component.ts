import {Component, Inject, OnInit} from '@angular/core';
import {OperatorService} from '../../../../services/operator.service';
import {GlobalsService} from '../../../../services/globals.service';
import {MatSnackBar} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Operator, Operator as __Operator} from "../../../../models/Operator";

@Component({
  selector: 'app-jelszo-modositas',
  templateUrl: './jelszoModositas.component.html',
  styleUrls: ['./jelszoModositas.component.css']
})
export class JelszoModositasComponent implements OnInit {
  _operator: __Operator;
  _aktualisJelszo: string;
  _ujJelszo1: string;
  _ujJelszo2: string;
  _dialogRef: MatDialogRef<JelszoModositasComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) private operator: __Operator,
              private operatorService: OperatorService,
              private global: GlobalsService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<JelszoModositasComponent>) {
    this._operator = operator;
    this._aktualisJelszo = null;
    this._ujJelszo1 = null;
    this._ujJelszo2 = null;
    this._dialogRef = dialogRef;
  }

  ngOnInit() {
  }

  private jelszoMentese() {
    if (this.aktualisJelszoEllenorzese(this._aktualisJelszo) && this.ujJelszoEllenorzese(this._ujJelszo1, this._ujJelszo2)) {
      this.ujJelszoMentese();
    }
  }

  private aktualisJelszoEllenorzese(aktualisJelszo: string):boolean {
    if (this._operator.password === aktualisJelszo) {
      return true;
    } else {
      this.uzenetek('Hibás jelszavat adott meg!')
      this._aktualisJelszo = null;
      return false;
    }
  }

  private ujJelszoEllenorzese(ujJelszo1: string, ujJelszo2: string):boolean {
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

  private ujJelszoMentese() {
    this._operator.password = this._ujJelszo1;
    this.operatorService.updateOperatorPassword(this._operator).subscribe(operator => {
      this.uzenetek('Jelszó módosítás sikerült!');
      this.dialogRef.close({data: 'true'});
    },
      error => {
        this.uzenetek('Jelszó módosítás NEM sikerült!');
      })
  }

  private uzenetek(uzenet: string) {
    this.snackBar.open(uzenet, 'Bezár')._dismissAfter(2000);
  }

}
