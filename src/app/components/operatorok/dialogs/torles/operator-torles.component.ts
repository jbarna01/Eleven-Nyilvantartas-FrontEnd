import {Component, Inject, OnInit} from '@angular/core';
import {Operator as __operator} from "../../../../models/Operator";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-operator-torles',
  templateUrl: './operator-torles.component.html',
  styleUrls: ['./operator-torles.component.css']
})
export class OperatorTorlesComponent implements OnInit {

  operator: __operator

  constructor(@Inject(MAT_DIALOG_DATA) private _operator: __operator) {
    this.operator = _operator;
  }

  ngOnInit() {
  }

}
