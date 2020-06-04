import {HttpClient as __HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable as __Observable } from 'rxjs';
import {filter as __filter, map as __map} from 'rxjs/operators';
import {Jogok as __Jogok} from '../models/Jogok';
import {Result} from '../models/Result';
import {BaseService} from './base-service';
import {StarterConfiguration as __Configuration} from './StarterConfiguration';
import {StrictHttpResponse as __StrictHttpResponse} from './strict-http-response';

@Injectable({
  providedIn: 'root'})

export class JogokService extends BaseService {
  private _urlJog = '/jog/';

  constructor(config: __Configuration, http: __HttpClient) {
    super(config, http);
  }

  /**
   * Összes jogot visszadja
   */
  getJogokGETResponse(): __Observable<__StrictHttpResponse<Result<__Jogok[]>>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    const __body: any = null;
    const req = new HttpRequest<any>('GET', this.rootUrl + this._urlJog, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'});
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Result<__Jogok[]>>;
      }));
  }

  getJogokGET(): __Observable<Result<__Jogok[]>> {
    return this.getJogokGETResponse().pipe(__map(_response => _response.body as Result<__Jogok[]>));
  }

  /**
   * Az id által meghatározott jog objektúmot adja vissza
   */
  getJogGETResponse(params: JogGETParams): __Observable<__StrictHttpResponse<Result<__Jogok[]>>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    const __body: any = null;
    const req = new HttpRequest<any>('GET', this.rootUrl + this._urlJog + `${params.id}`, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'});
    return this.http.request<any>(req).pipe(
      __filter(_response => _response instanceof HttpResponse),
      __map(_response => {
        return _response as __StrictHttpResponse<Result<__Jogok[]>>;
      }));
  }

  getJogGET(params: JogGETParams): __Observable<Result<__Jogok[]>> {
    return this.getJogGETResponse(params).pipe(__map(_response => _response.body as Result<__Jogok[]>));
  }
}

export interface JogGETParams {
  id: string;
}
