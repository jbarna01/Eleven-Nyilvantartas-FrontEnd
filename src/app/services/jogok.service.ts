import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {__BaseService} from "./base-service";
import {HttpClient as __HttpClient, HttpParams as __HttpParams} from "@angular/common/http";
import {Jogok as __Jogok} from "../models/Jogok";

@Injectable({
  providedIn: 'root'
})
export class JogokService extends __BaseService {
  private _urlJogok: string = 'http://localhost:8099/jogok';
  private _urlJog: string = 'http://localhost:8099/jog';

  constructor(http:__HttpClient) {
    super(http);
  }

  /**
   * Összes jogot visszadja
   */
  getJogok():Observable<__Jogok[]> {
    return this.http.get<__Jogok[]>(this._urlJogok);
  }

  /**
   * Az id által meghatározott jog objektúmot adja vissza
   * @param params
   */
  getJogGET(params: __HttpParams):Observable<__Jogok> {
    return this.http.get<__Jogok>(this._urlJog + '/' + params.get('id'));
  }

}
