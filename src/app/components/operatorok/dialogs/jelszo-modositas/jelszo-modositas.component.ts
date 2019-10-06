import { Component, OnInit } from '@angular/core';
import {OperatorService} from '../../../../services/operator.service';
import {GlobalsService} from '../../../../services/globals.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-jelszo-modositas',
  templateUrl: './jelszo-modositas.component.html',
  styleUrls: ['./jelszo-modositas.component.css']
})
export class JelszoModositasComponent implements OnInit {

  _aktualisJelszo: string;
  _ujJelszo1: string;
  _ujJelszo2: string;

  constructor(private operatorService: OperatorService,
              private global: GlobalsService,
              private _snackBar: MatSnackBar) {
    this._aktualisJelszo = null;
    this._ujJelszo1 = null;
    this._ujJelszo2 = null;
  }

  ngOnInit() {
  }

  private jelszoMentese() {
    if (this.aktualisJelszoEllenorzese(this._aktualisJelszo) && this.ujJelszoEllenorzese(this._ujJelszo1, this._ujJelszo2)) {
      this.ujJelszoMentese(this._ujJelszo1);
    }
  }

  private aktualisJelszoEllenorzese(aktualisJelszo: string):boolean {
    return true;
  }

  private ujJelszoEllenorzese(ujJelszo1: string, ujJelszo2: string):boolean {
    return ujJelszo1 === ujJelszo2;
  }

  private ujJelszoMentese(jelszo: string) {
    console.log('Új jelszó mentése');
    this.uzenetek('Jelsó változtatás! Új jelszó: ' + jelszo);
  }

  private uzenetek(uzenet: string) {
    this._snackBar.open(uzenet, 'Bezár')._dismissAfter(2000);
  }

}
