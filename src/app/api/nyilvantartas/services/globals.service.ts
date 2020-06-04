import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'})

export class GlobalsService {

  public _belepettFelhasznaloId = new BehaviorSubject<number>(0);
  public _felhasznaloId = this._belepettFelhasznaloId.asObservable();

  public isBelepveStatus = new BehaviorSubject<boolean>(false);
  public _isBelepve = this.isBelepveStatus.asObservable();

  public _belepetFelhasznaloTeljesNeve = new BehaviorSubject<string>('');
  public _belepettTeljesNev = this._belepetFelhasznaloTeljesNeve.asObservable();

  public _belepettFelhasznaloAlapJoga = new BehaviorSubject<string>('');
  public _belepettFelhasznaloJoga = this._belepettFelhasznaloAlapJoga.asObservable();

  constructor() { }

  changeLogin(loginStatus: boolean) {
    this.isBelepveStatus.next(loginStatus);
  }

  getFelhasznaloId() {
    return this._belepettFelhasznaloId;
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
