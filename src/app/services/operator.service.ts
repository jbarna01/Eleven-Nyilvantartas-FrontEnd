import { Injectable } from '@angular/core';
import {__BaseService} from "./base-service";
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpParams} from "@angular/common/http";
import {Operator as __Operator} from "../models/Operator";
import {catchError} from "rxjs/operators";
import {StarterConfiguration as __Configuration} from "./StarterConfiguration";
import {Observable, of} from "rxjs";
import { map as __map, filter as __filter } from 'rxjs/operators';
import {StrictHttpResponse as __StrictHttpResponse} from "./strict-http-response";



@Injectable({
  providedIn: 'root'
})
export class OperatorService extends __BaseService{

  private _urlOperator: string = 'http://localhost:8099/operator';
  private _urlLoginOperetor: string = 'http://localhost:8099/loginOperator';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/xml',
      'Authorization': 'jwt-token'
    })
  };

  constructor(config: __Configuration, http:HttpClient) {
    super(config, http);
  }

  /**
   * A parametérben megadott ID által meghatározott operátort adja vissza.
   * @param params
   */
  getOperator(params: HttpParams):Observable<__Operator[]> {
    return this.http.get<__Operator[]>(this._urlOperator + '/' + params.get('id'));
  }

  /**
   * Összes operatort visszadja
   */
  // getOperatorokGET():Observable<__Operator[]> {
  //   return this.http.get<__Operator[]>(this._urlOperator);
  // }

  getAllOperatorokGETResponse(): Observable<__StrictHttpResponse<Array<__Operator>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>('GET', this.rootUrl + `/operator`, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as __StrictHttpResponse<Array<__Operator>>;
      })
    );
}


  getOperatorokGET():Observable<__Operator[]> {
    return this.getAllOperatorokGETResponse().pipe(__map(_r => _r.body as Array<__Operator>));
  }

  /**
   * A felhasználó beléptetése
   * felhasználónév és jelszó alapján.
   * @param params
   */
  loginOperatorGET(params: HttpParams):Observable<__Operator> {
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
  deleteOperatorDELETE(params: HttpParams) {
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
