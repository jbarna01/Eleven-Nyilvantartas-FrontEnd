import { Component, OnInit } from '@angular/core';
import {Operator} from "../../models/Operator";
import {OperatorService} from "../../services/operator.service";
import {CoreService} from "../../services/core.service";

@Component({
  selector: 'app-operatorok',
  templateUrl: './operatorok.component.html',
  styleUrls: ['./operatorok.component.css']
})
export class OperatorokComponent implements OnInit {

  operatorokLista: Operator[];

  constructor(private operatorService: OperatorService) { }

  ngOnInit() {
    this.operatorService.getOperatorok().subscribe( operatorok => {
      this.operatorokLista = operatorok;
    })
  }

}
