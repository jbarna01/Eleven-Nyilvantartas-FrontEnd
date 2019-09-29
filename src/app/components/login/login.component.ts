import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalsService} from "../../services/globals.service";
import {OperatorService} from "../../services/operator.service";
import {Operator} from "../../models/Operator";
import {MatSnackBar} from "@angular/material";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private userName = '';
  private password = '';
  private operator: Operator;
  // private currentOperatorSubject: BehaviorSubject<Operator>;
  // public currentOperator: Observable<Operator>;
  private isBelepve: boolean;
  private params: HttpParams;

  constructor(
              private _route: ActivatedRoute,
              private _router: Router,
              private _global: GlobalsService,
              private _operatorService: OperatorService,
              private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._global.isBelepve.subscribe(isBelepve => this.isBelepve = isBelepve)
  }

  belepes() {

  this.operator = new Operator();

    if (this.userName) {
      this.operator.username = this.userName;
      this.operator.password = this.password;

      this.params = this.setParameters(this.userName, this.password);

      this._operatorService.loginOperatorGET(this.params).subscribe( operator => {
        this.operator = operator
        if (this.operator != null) {
          console.log('Belépve');
          this._global.changeLogin(true);
          this._router.navigate(['cimsor',1])
        } else {
          this.uzenetek('Sikertelen belépés!');
        }
      });
    } else {
      this.uzenetek('A felhasználó név megadása kötelező');
    }
  }

  uzenetek(uzenet: string) {
  this._snackBar.open(uzenet, 'Bezár')._dismissAfter(2000);
}

  setParameters(username: string, password: string): HttpParams {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return params
  }

}
