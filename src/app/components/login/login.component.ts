import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalsService} from '../../services/globals.service';
import {OperatorService} from '../../services/operator.service';
import {Operator} from '../../models/Operator';
import {MatSnackBar} from '@angular/material';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private _userName = '';
  private _password = '';
  private _operator: Operator;
  private _isBelepve: boolean;
  private _params: HttpParams;
  private _teljesNev: string;

  constructor(
              private _route: ActivatedRoute,
              private _router: Router,
              private _global: GlobalsService,
              private _operatorService: OperatorService,
              private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._global._isBelepve.subscribe(isBelepve => this._isBelepve = isBelepve);
  }

  private belepes() {
    this._operator = new Operator();
    if (this._userName) {
      this._operator.username = this._userName;
      this._operator.password = this._password;
      this._params = this.setParameters(this._userName, this._password);

      this._operatorService.loginOperatorGET(this._params).subscribe( operator => {
        this._operator = operator;
        if (this._operator != null) {
          this._global.changeLogin(true);
          this._teljesNev = this._operator.vezetekNev + ' ' + this._operator.keresztNev;
          this._global.setTeljesNev(this._teljesNev);
          this._global.setFelhasznaloId(this._operator.id);
          this._global.setFelhasznaloJoga(this._operator.jogok[0].code);
          this._router.navigate(['/cimsor']);
        } else {
          this.uzenetek('Sikertelen belépés!');
        }
      });
    } else {
      this.uzenetek('A felhasználó név megadása kötelező');
    }
  }

  private uzenetek(uzenet: string) {
  this._snackBar.open(uzenet, 'Bezár')._dismissAfter(2000);
}

  private setParameters(username: string, password: string): HttpParams {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return params;
  }
}
