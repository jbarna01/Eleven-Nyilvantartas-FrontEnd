import { Injectable } from '@angular/core';
import {__BaseService} from "./base-service";
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Operator as __Operator} from "../models/Operator";
import {StarterConfiguration as __Configuration} from "./StarterConfiguration";
import {Observable as __Observable, of} from "rxjs";
import { map as __map, filter as __filter } from 'rxjs/operators';
import {StrictHttpResponse as __StrictHttpResponse} from "./strict-http-response";
import { LoginOperatorGETRequest as LoginOperatorGETParams } from "../models/LoginOperatorGETRequest";
import {OperatorCreateModel} from "../models/operator-create-model";


@Injectable({
  providedIn: 'root'
})
class OperatorService extends __BaseService{

  private _urlOperator: string = '/operator/';
  private _urlUsername: string = '/operator/username/';
  private _urlLoginOperetor: string = '/loginOperator/';

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
  getOperatorGETResponse(
    params: OperatorService.OperatorGETParams
  ): __Observable<__StrictHttpResponse<Array<__Operator>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>('GET', this.rootUrl + this._urlOperator + `${params.id}`, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Array<__Operator>>;
      })
    );
  }

  getOperatorGET(params: OperatorService.OperatorGETParams):__Observable<__Operator[]> {
    return this.getOperatorGETResponse(params).pipe(__map(_response => _response.body as Array<__Operator>));
  }


  getUsernameGETResponse(
    params: OperatorService.UsernameGETParams
  ): __Observable<__StrictHttpResponse<Array<__Operator>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>('GET', this.rootUrl + this._urlUsername + `${params.username}`, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Array<__Operator>>;
      })
    );
  }

  getUsernameGET(params: OperatorService.UsernameGETParams):__Observable<__Operator[]> {
    return this.getUsernameGETResponse(params).pipe(__map(_response => _response.body as Array<__Operator>));
  }




  /**
   * Összes operatort visszadja
   */
  getAllOperatorokGETResponse(): __Observable<__StrictHttpResponse<Array<__Operator>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>('GET', this.rootUrl + this._urlOperator, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Array<__Operator>>;
      })
    );
  }

  getAllOperatorokGET():__Observable<__Operator[]> {
    return this.getAllOperatorokGETResponse().pipe(__map(_response => _response.body as Array<__Operator>));
  }

  /**
   * A felhasználó beléptetése
   * felhasználónév és jelszó alapján.
   * @param params
   */
  loginOperatorGETResponse(
    params: LoginOperatorGETParams
  ): __Observable<__StrictHttpResponse<Array<__Operator>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.username != null) __params = __params.set('username', params.username.toString());
    if (params.password != null) __params = __params.set('password', params.password.toString());
    let req = new HttpRequest<any>('GET', this.rootUrl + this._urlLoginOperetor, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Array<__Operator>>;
      })
    );
  }

  loginOperatorGET(params: LoginOperatorGETParams):__Observable<__Operator[]> {
    return this.loginOperatorGETResponse(params).pipe(__map(_response => _response.body as Array<__Operator>));
  }

  /**
   * A felhasználó jelszóváltoztatásának REST service hívása
   * @param operator
   */
  updateOperatorPUTResponse(params: OperatorService.updateOperatorPUTParams): __Observable<__StrictHttpResponse<OperatorCreateModel>> {
    // return this.http.put<__Operator>(this._urlOperator + '/' + operator.id, operator);
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.request;
    let req = new HttpRequest<any>('PUT', this.rootUrl  + this._urlOperator + `${params.id}`, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as __StrictHttpResponse<OperatorCreateModel>;
      })
    );

  }

  updateOperatorPUT(params: OperatorService.updateOperatorPUTParams): __Observable<OperatorCreateModel> {
    // return this.http.put<__Operator>(this._urlOperator + '/' + operator.id, operator);
    return this.updateOperatorPUTResponse(params).pipe(__map(_r => _r.body as OperatorCreateModel));
  }


  /**
   * Új operátor mentésének REST service hívása.
   * @param operator
   */
  saveOperatorPOSTResponse(
    request: OperatorCreateModel
  ): __Observable<__StrictHttpResponse<OperatorCreateModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = request;
    let req = new HttpRequest<any>('POST', this.rootUrl + this._urlOperator, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as __StrictHttpResponse<OperatorCreateModel>;
      })
    );
  }

  saveOperatorPOST(request: OperatorCreateModel): __Observable<OperatorCreateModel> {
    return this.saveOperatorPOSTResponse(request).pipe(__map(_r => _r.body as OperatorCreateModel));
  }

  /**
   * Kiválasztott operátor-t törlő REST service hívása.
   * @param params
   */
  deleteOperatorDELETEResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>('DELETE', this.rootUrl + this._urlOperator + `${id}`, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map(_r => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }

  deleteOperatorDELETE(id: string): __Observable<null> {
    return this.deleteOperatorDELETEResponse(id).pipe(__map(_response => _response.body as null));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): __Observable<T> => {
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
  export interface OperatorGETParams {
    id: string;
  }

  export interface UsernameGETParams {
    username: string;
  }

  export interface updateOperatorPUTParams {
    id: string;
    request: OperatorCreateModel;
  }

  export interface JogGETParams {
    id: string;
  }
}

export { OperatorService };

