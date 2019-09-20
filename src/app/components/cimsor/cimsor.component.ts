import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {GlobalsService} from "../../services/globals.service";

@Component({
  selector: 'app-cimsor',
  templateUrl: './cimsor.component.html',
  styleUrls: ['./cimsor.component.css']
})
export class CimsorComponent implements OnInit {

  isBelepve: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private global: GlobalsService ) {
  }

  ngOnInit() {
    this.global.isBelepve.subscribe(isBelepve => this.isBelepve = isBelepve)
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
