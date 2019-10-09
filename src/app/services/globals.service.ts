import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/index";


@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private belepettFelhasznaloId = new BehaviorSubject<number>(0);
  felhasznalId = this.belepettFelhasznaloId.asObservable();

  private isBelepveStatus = new BehaviorSubject<boolean>(false);
  isBelepve = this.isBelepveStatus.asObservable();

  private felhasznaloTeljesNeve = new BehaviorSubject<string>('');
  teljesNev = this.felhasznaloTeljesNeve.asObservable();

  private _felhasznaloAlapJoga = new BehaviorSubject<string>('');
  felhasznaloJoga = this._felhasznaloAlapJoga.asObservable();

  constructor() { }

  changeLogin(loginStatus: boolean) {
    this.isBelepveStatus.next(loginStatus);
  }

  setFelhasznaloId(felhasznloId: number) {
    this.belepettFelhasznaloId.next(felhasznloId);
  }

  setTeljesNev(teljesNev: string) {
    this.felhasznaloTeljesNeve.next(teljesNev);
  }

  setFelhasznaloJoga(value: BehaviorSubject<string>) {
    this._felhasznaloAlapJoga = value;
  }
}
