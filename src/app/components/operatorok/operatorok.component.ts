import { Component, OnInit } from '@angular/core';
import {Operator} from "../../models/Operator";
import {OperatorService} from "../../services/operator.service";
import {CoreService} from "../../services/core.service";
import {GlobalsService} from "../../services/globals.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-operatorok',
  templateUrl: './operatorok.component.html',
  styleUrls: ['./operatorok.component.css']
})
export class OperatorokComponent implements OnInit {

  operatorokLista: Operator[];
  isBelepve: boolean;

  constructor(private operatorService: OperatorService,
              private global: GlobalsService,
              private router: Router) { }

  ngOnInit() {
    this.global.isBelepve.subscribe(isBelepve => this.isBelepve = isBelepve)
    if (!this.isBelepve) {
      console.log('Nincs belépve senki');
      this.router.navigate(['']);
    } else {
      this.operatorService.getOperatorok().subscribe(operatorok => {
        this.operatorokLista = operatorok;
      })
    }
  }

}
