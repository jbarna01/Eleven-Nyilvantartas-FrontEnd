import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {__BaseService} from "./base-service";
import {HttpClient as __HttpClient, HttpParams as __HttpParams} from "@angular/common/http";
import {Operator as __Operator} from "../models/Operator";

@Injectable({
  providedIn: 'root'
})
export class OperatorService extends __BaseService{

  private _urlOperatorok: string = 'http://localhost:8099/operatorok';
  private _urlOperator: string = 'http://localhost:8099/operator';
  private _urlLoginOperetor: string = 'http://localhost:8099/loginOperator';

  constructor(http: __HttpClient) {
    super(http);
  }

  /**
   * A parametérben megadott ID által meghatározott operátort adja vissza.
   * @param params
   */
  getOperator(params: __HttpParams):Observable<__Operator[]> {
    return this.http.get<__Operator[]>(this._urlOperator + '/' + params.get('id'));
  }

  /**
   * Összes operatort visszadja
   */
  getOperatorokGET():Observable<__Operator[]> {
    return this.http.get<__Operator[]>(this._urlOperatorok);
  }

  /**
   * A felhasználó beléptetése
   * felhasználónév és jelszó alapján.
   * @param params
   */
  loginOperatorGET(params: __HttpParams):Observable<__Operator> {
    return this.http.get<__Operator>(this._urlLoginOperetor + '/' + params.get('username') + '/' + params.get('password'));
  }

  /**
   * A felhasználó jlszóváltoztatása.
   * @param operator
   */
  updateOperatorPUT(operator: __Operator):Observable<__Operator> {
    return this.http.put<__Operator>(this._urlOperator + '/' + operator.id, operator);
  }

  // saveOperatorPOST(operator: Operator) {
  //   return this.http.post(this._urlOperator, operator);
  // }
}


module OperatorService {
}
