import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/index";


@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private isBelepveStatus = new BehaviorSubject<boolean>(false);
  isBelepve = this.isBelepveStatus.asObservable();

  constructor() { }

  changeLogin(loginStatus: boolean) {
    this.isBelepveStatus.next(loginStatus);
  }
}
