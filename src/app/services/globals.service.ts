import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/index";


@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private isBelepveStatus = new BehaviorSubject<boolean>(false);
  isBelepve = this.isBelepveStatus.asObservable();

  private felhasznaloTeljesNeve = new BehaviorSubject<string>('');
  teljesNev = this.felhasznaloTeljesNeve.asObservable();


  constructor() { }

  changeLogin(loginStatus: boolean) {
    this.isBelepveStatus.next(loginStatus);
  }

  setTeljesNev(teljesNev: string) {
    this.felhasznaloTeljesNeve.next(teljesNev);
  }
}
