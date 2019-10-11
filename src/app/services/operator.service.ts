import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import {Operator} from "../models/Operator";
import {__BaseService} from "./base-service";

@Injectable({
  providedIn: 'root'
})
export class OperatorService extends __BaseService{

  urlOperatorok:string = 'http://localhost:8099/operatorok';
  urlOperator:string = 'http://localhost:8099/operator';
  urlLoginOperetor:string = 'http://localhost:8099/loginOperator';

  constructor(http:HttpClient) {
    super(http);
  }

  /**
   * A parametérben megadott ID által meghatározott operátort adja vissza.
   * @param params
   */
  getOperator(params: HttpParams):Observable<Operator[]> {
    return this.http.get<Operator[]>(this.urlOperator + '/' + params.get('id'));
  }

  /**
   * Összes operatort visszadja
   */
  getOperatorokGET():Observable<Operator[]> {
    return this.http.get<Operator[]>(this.urlOperatorok);
  }

  /**
   * A felhasználó beléptetése
   * felhasználónév és jelszó alapján.
   * @param params
   */
  loginOperatorGET(params: HttpParams):Observable<Operator> {
    return this.http.get<Operator>(this.urlLoginOperetor + '/' + params.get('username') + '/' + params.get('password'));
  }

  /**
   * A felhasználó jlszóváltoztatása.
   * @param operator
   */
  updateOperatorPUT(operator: Operator):Observable<Operator> {
    return this.http.put<Operator>(this.urlOperator + '/' + operator.id, operator);
  }

  saveOperatorPOST(operator: Operator) {
    return this.http.post(this.urlOperator, operator);
  }
}


module OperatorService {


}
