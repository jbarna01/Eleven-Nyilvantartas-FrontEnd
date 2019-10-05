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

/*
  readLoginOperatorUsingGETResponse(
    params: OperatorLoginRequest
  ): Observable<StrictHttpResponse<OperatorResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __params.set('username', 'akos');
    __params.set('password', 'password');
    let req = new HttpRequest<any>('GET', this.urlLoginOperetor, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        return _r as StrictHttpResponse<OperatorResponse>;
      })
    );
  }

  readLoginOperatorUsingGET(
    params: OperatorLoginRequest
  ): Observable<void> {
    return this.readLoginOperatorUsingGETResponse(params).pipe(map(_r => console.log(_r.ok)));
  }
 */

}


module OperatorService {


}
