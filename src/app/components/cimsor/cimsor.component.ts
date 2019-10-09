import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {GlobalsService} from "../../services/globals.service";

@Component({
  selector: 'app-cimsor',
  templateUrl: './cimsor.component.html',
  styleUrls: ['./cimsor.component.css']
})
export class CimsorComponent implements OnInit {

  private _isBelepve: boolean;
  private _teljesNev: string;

  constructor(
          private route: ActivatedRoute,
          private router: Router,
          private global: GlobalsService ) {
  }

  ngOnInit() {
    this.global._isBelepve.subscribe(isBelepve => this._isBelepve = isBelepve);
    this.global._teljesNev.subscribe(teljesNev => this._teljesNev = teljesNev);
    if (!this._isBelepve) {
      console.log('Nincs belépve senki');
      this.router.navigate(['']);
    }
  }

  hallgatoiLista() {
    this.router.navigate(['hallgatok']);
  }

  torzs() {
    this.router.navigate(['operatorok']);
  }

  logout() {
    this.global.changeLogin(false);
    this.router.navigate([''])
  }


}
