import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Operator} from "../models/Operator";

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  url:string = 'http://localhost:8080/operatorok';

  constructor(private http:HttpClient) { }

  getOperatorok():Observable<Operator[]> {
    return this.http.get<Operator[]>(this.url);
  }
}
