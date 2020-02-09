import {Component, OnInit } from '@angular/core';
import {ActivatedRoute as __ActivatedRoute, Router as __Router} from '@angular/router';
import {GlobalsService as __GlobalsService} from '../../api/nyilvantartas/services/globals.service';
import {MatSnackBar as __MatSnackBar} from '@angular/material';
import {HttpParams as __HttpParams} from '@angular/common/http';
import {OperatorService as __OperatorService} from '../../api/nyilvantartas/services/operator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  _userName = '';
  _password = '';
  private _operator: any;
  private _isBelepve: boolean;
  private _params: __HttpParams;
  private _teljesNev: string;

  constructor(private __route: __ActivatedRoute,
              private __router: __Router,
              private __global: __GlobalsService,
              private __operatorService: __OperatorService,
              private __snackBar: __MatSnackBar
  ) { }

  ngOnInit() {
    this.__global._isBelepve.subscribe(isBelepve => this._isBelepve = isBelepve);
  }

  /**
   * Belépteti a felhasználót
   */
  belepes() {
    if (this._userName) {
      this.__operatorService.loginOperatorGET( {username: this._userName, password: this._password}).subscribe( operator => {
        this._operator = operator;
        if (this._operator != null) {
          if (this._operator.aktiv == 'A')
          {
            this.__global.changeLogin(true);
            this._teljesNev = this._operator.vezetekNev + ' ' + this._operator.keresztNev;
            this.__global.setTeljesNev(this._teljesNev);
            this.__global.setFelhasznaloId(this._operator.id);
            this.__global.setFelhasznaloJoga(this._operator.jogok.code);
            this.__router.navigate(['/cimsor']);
          } else {
            this.uzenetek('Csak akítv felhasználó léphet be! Kérem vegye fel a kapcsolatott az adminisztrátorral!');
          }
        } else {
          this.uzenetek('Sikertelen belépés!');
        }
      });
    } else {
      this.uzenetek('A felhasználó név megadása kötelező');
    }
  }

  /**
   * Kiírja az uzenet változóban lévő üzenetett a képernyőre.
   * 2 másodperc múlva autómatikusan eltünteti!
   * @param uzenet, a kiírandó üzenet.
   */
  private uzenetek(uzenet: string) {
    this.__snackBar.open(uzenet, 'Bezár')._dismissAfter(2000);
  }
}
