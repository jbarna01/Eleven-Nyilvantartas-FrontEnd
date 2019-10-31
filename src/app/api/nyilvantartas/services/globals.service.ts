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

  private _belepetFelhasznaloTeljesNeve = new BehaviorSubject<string>('');
  _belepettTeljesNev = this._belepetFelhasznaloTeljesNeve.asObservable();

  private _belepettFelhasznaloAlapJoga = new BehaviorSubject<string>('');
  _belepettFelhasznaloJoga = this._belepettFelhasznaloAlapJoga.asObservable();

  constructor() { }

  changeLogin(loginStatus: boolean) {
    this.isBelepveStatus.next(loginStatus);
  }

  setFelhasznaloId(felhasznloId: number) {
    this._belepettFelhasznaloId.next(felhasznloId);
  }

  setTeljesNev(teljesNev: string) {
    this._belepetFelhasznaloTeljesNeve.next(teljesNev);
  }

  setFelhasznaloJoga(felhasznaloJoga: string) {
    this._belepettFelhasznaloAlapJoga.next(felhasznaloJoga);
  }
}
