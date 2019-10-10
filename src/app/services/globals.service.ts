import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs/index";


@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private _belepettFelhasznaloId = new BehaviorSubject<number>(0);
  _felhasznaloId = this._belepettFelhasznaloId.asObservable();

  private isBelepveStatus = new BehaviorSubject<boolean>(false);
  _isBelepve = this.isBelepveStatus.asObservable();

  private _felhasznaloTeljesNeve = new BehaviorSubject<string>('');
  _teljesNev = this._felhasznaloTeljesNeve.asObservable();

  private _felhasznaloAlapJoga = new BehaviorSubject<string>('');
  _felhasznaloJoga = this._felhasznaloAlapJoga.asObservable();

  constructor() { }

  changeLogin(loginStatus: boolean) {
    this.isBelepveStatus.next(loginStatus);
  }

  setFelhasznaloId(felhasznloId: number) {
    this._belepettFelhasznaloId.next(felhasznloId);
  }

  setTeljesNev(teljesNev: string) {
    this._felhasznaloTeljesNeve.next(teljesNev);
  }

  setFelhasznaloJoga(felhasznaloJoga: string) {
    this._felhasznaloAlapJoga.next(felhasznaloJoga);
  }
}
