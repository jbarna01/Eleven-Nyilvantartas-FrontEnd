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
    this.global.isBelepve.subscribe(isBelepve => this._isBelepve = isBelepve);
    let teljesNev = this.route.snapshot.paramMap.get('belepetFelhasznalo');
    this._teljesNev = teljesNev;
  }

  hallagoiLista() {
    this.router.navigate(['hallgatok'])
  }

  torzs() {
    console.log("Törzsadat")
  }

  logout() {
    this.global.changeLogin(false);
    this.router.navigate([''])
  }


}
