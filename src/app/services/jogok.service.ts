import { Injectable } from '@angular/core';
import {__BaseService} from "./base-service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Operator} from "../models/Operator";
import {Jogok} from "../models/Jogok";

@Injectable({
  providedIn: 'root'
})
export class JogokService extends __BaseService {
  _urlJogok:string = 'http://localhost:8099/jogok';

  constructor(http:HttpClient) {
    super(http);
  }

  /**
   * Összes jogot visszadja
   */
  getJogok():Observable<Jogok[]> {
    return this.http.get<Jogok[]>(this._urlJogok);
  }

}
