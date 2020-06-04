import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable as __Observable, of} from 'rxjs';
import { filter as __filter, map as __map } from 'rxjs/operators';
import { LoginOperatorGETRequest as LoginOperatorGETParams } from '../models/LoginOperatorGETRequest';
import {Operator as __Operator} from '../models/Operator';
import {OperatorCreateModel} from '../models/operator-create-model';
import {Result} from '../models/Result';
import {BaseService} from './base-service';
import {StarterConfiguration as __Configuration} from './StarterConfiguration';
import {StrictHttpResponse as __StrictHttpResponse} from './strict-http-response';

@Injectable({
  providedIn: 'root'})

export class OperatorService extends BaseService {

  private _urlOperator = '/operator/';
  private _urlUsername = '/operator/username/';
  private _urlLoginOperetor = '/loginOperator/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/xml',
      'Authorization': 'jwt-token'})};

  constructor(config: __Configuration, http: HttpClient) {
    super(config, http);
  }

  /**
   * A parametérben megadott ID által meghatározott operátort adja vissza.
   */
  getOperatorGETResponse(params: OperatorGETParams): __Observable<__StrictHttpResponse<Result<__Operator[]>>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    const __body: any = null;
    const req = new HttpRequest<any>('GET', this.rootUrl + this._urlOperator + `${params.id}`, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'});
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Result<__Operator[]>>;
      }));
  }

  getOperatorGET(params: OperatorGETParams): __Observable<Result<__Operator[]>> {
    return this.getOperatorGETResponse(params).pipe(__map(_response => _response.body as Result<__Operator[]>));
  }

  /**
   * Összes operatort visszadja
   */
  getAllOperatorokGETResponse(): __Observable<__StrictHttpResponse<Result<__Operator[]>>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    const __body: any = null;
    const req = new HttpRequest<any>('GET', this.rootUrl + this._urlOperator, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'});
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Result<__Operator[]>>;
      }));
  }

  getAllOperatorokGET(): __Observable<Result<__Operator[]>> {
    return this.getAllOperatorokGETResponse().pipe(__map(_response => _response.body as Result<__Operator[]>));
  }

  /**
   * A felhasználó beléptetése
   * felhasználónév és jelszó alapján.
   */
  loginOperatorGETResponse(
    params: LoginOperatorGETParams): __Observable<__StrictHttpResponse<Result<__Operator>>> {
    let __params = this.newParams();
    const __headers = new HttpHeaders();
    const __body: any = null;
    if (params.username != null) { __params = __params.set('username', params.username.toString()); }
    if (params.password != null) { __params = __params.set('password', params.password.toString()); }
    const req = new HttpRequest<any>('GET', this.rootUrl + this._urlOperator + this._urlLoginOperetor, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'});
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Result<__Operator>>;
      }));
  }

  loginOperatorGET(params: LoginOperatorGETParams): __Observable<Result<__Operator>> {
    return this.loginOperatorGETResponse(params).pipe(__map(_response => _response.body as Result<__Operator>));
  }

  /**
   * Új operátor mentésének REST service hívása.
   */
  saveOperatorPOSTResponse(
    request: OperatorCreateModel): __Observable<__StrictHttpResponse<OperatorCreateModel>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    let __body: any = null;
    __body = request;
    const req = new HttpRequest<any>('POST', this.rootUrl + this._urlOperator, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'});

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as __StrictHttpResponse<OperatorCreateModel>;
      }));
  }

  saveOperatorPOST(request: OperatorCreateModel): __Observable<OperatorCreateModel> {
    return this.saveOperatorPOSTResponse(request).pipe(__map(_r => _r.body as OperatorCreateModel));
  }
}

export interface OperatorGETParams {
  id: string;
}

export interface UsernameGETParams {
  username: string;
}
