import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import {Operator} from "../models/Operator";
import {__BaseService} from "./base-service";

@Injectable({
  providedIn: 'root'
})
export class OperatorService extends __BaseService{

  urlOperetorok:string = 'http://localhost:8099/operatorok';
  urlLoginOperetor:string = 'http://localhost:8099/loginOperator';

  constructor(http:HttpClient) {
    super(http);
  }

  getOperatorok():Observable<Operator[]> {
    return this.http.get<Operator[]>(this.urlOperetorok);
  }

  loginOperatorGET(params: HttpParams):Observable<Operator> {
    return this.http.get<Operator>(this.urlLoginOperetor + '/' + params.get('username') + '/' + params.get('password'));
  }

  updateOperatorPassword(operator: Operator):Observable<Operator> {
    return this.http.put<Operator>(this.urlOperetorok + operator.id, operator);
  }

}


module OperatorService {


}
