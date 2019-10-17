import {Component, OnInit } from '@angular/core';
import {ActivatedRoute as __ActivatedRoute, Router as __Router} from '@angular/router';
import {GlobalsService as __GlobalsService} from '../../services/globals.service';
import {OperatorService as __OperatorService} from '../../services/operator.service';
import {Operator as __Operator} from '../../models/Operator';
import {MatSnackBar as __MatSnackBar} from '@angular/material';
import {HttpParams as __HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private _userName = '';
  private _password = '';
  private _operator: __Operator;
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
  private belepes() {
    this._operator = new __Operator();
    if (this._userName) {
      this._operator.username = this._userName;
      this._operator.password = this._password;
      this._params = this.setParameters(this._userName, this._password);

      this.__operatorService.loginOperatorGET(this._params).subscribe( operator => {
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

  private setParameters(username: string, password: string): __HttpParams {
    const params = new __HttpParams()
      .set('username', username)
      .set('password', password);
    return params;
  }
}
