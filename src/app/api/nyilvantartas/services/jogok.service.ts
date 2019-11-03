import { Injectable } from '@angular/core';
import {Observable as __Observable } from "rxjs";
import {__BaseService} from "./base-service";
import {HttpClient as __HttpClient, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Jogok as __Jogok} from "../models/Jogok";
import {StarterConfiguration as __Configuration} from "./StarterConfiguration";
import {filter as __filter, map as __map} from "rxjs/operators";
import {StrictHttpResponse as __StrictHttpResponse} from "./strict-http-response";
import {OperatorService} from "./operator.service";

@Injectable({
  providedIn: 'root'
})
export class JogokService extends __BaseService {
  private _urlJog: string = '/jog/';

  constructor(config: __Configuration, http:__HttpClient) {
    super(config, http);
  }

  /**
   * Összes jogot visszadja
   */
  getJogokGETResponse(): __Observable<__StrictHttpResponse<Array<__Jogok>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>('GET', this.rootUrl + this._urlJog, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Array<__Jogok>>;
      })
    );
  }

  getJogokGET():__Observable<__Jogok[]> {
    return this.getJogokGETResponse().pipe(__map(_response => _response.body as Array<__Jogok>));
  }

  /**
   * Az id által meghatározott jog objektúmot adja vissza
   * @param params
   */
  getJogGETResponse(params: OperatorService.JogGETParams
  ): __Observable<__StrictHttpResponse<Array<__Jogok>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>('GET', this.rootUrl + this._urlJog + `${params.id}`, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Array<__Jogok>>;
      })
    );

  }

  getJogGET(params: OperatorService.JogGETParams):__Observable<__Jogok[]> {
    return this.getJogGETResponse(params).pipe(__map(_response => _response.body as Array<__Jogok>));
  }

}
