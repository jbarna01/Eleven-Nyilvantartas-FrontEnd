import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {__BaseService} from "./base-service";
import {HttpClient as __HttpClient, HttpHeaders as __HttpHeaders, HttpParams as __HttpParams} from "@angular/common/http";
import {Operator as __Operator} from "../models/Operator";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OperatorService extends __BaseService{

  private _urlOperator: string = 'http://localhost:8099/operator';
  private _urlLoginOperetor: string = 'http://localhost:8099/loginOperator';

  private httpOptions = {
    headers: new __HttpHeaders({
      'Content-Type':  'application/xml',
      'Authorization': 'jwt-token'
    })
  };

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
    return this.http.get<__Operator[]>(this._urlOperator);
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
   * A felhasználó jelszóváltoztatásának REST service hívása
   * @param operator
   */
  updateOperatorPUT(operator: __Operator):Observable<__Operator> {
    return this.http.put<__Operator>(this._urlOperator + '/' + operator.id, operator);
  }

  /**
   * Új operátor mentésének REST service hívása.
   * @param operator
   */
  saveOperatorPOST(operator: __Operator) {
    return this.http.post(this._urlOperator, operator)
      .pipe(
        catchError(this.handleError('operator', operator))
      );
  }

  /**
   * Kiválasztott operátor-t törlő REST service hívása.
   * @param params
   */
  deleteOperatorDELETE(params: __HttpParams) {
    return this.http.delete(this._urlOperator + '/' + params.get('id'));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}

module OperatorService {
}
