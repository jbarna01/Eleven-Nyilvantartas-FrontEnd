import {Component, Inject, OnInit} from '@angular/core';
import {Operator as __Operator} from "../../../../api/nyilvantartas/models/Operator";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {OperatorService} from "../../../../api/nyilvantartas/services/operator.service";

@Component({
  selector: 'app-operator-torles',
  templateUrl: './operator-torles.component.html',
  styleUrls: ['./operator-torles.component.css']
})
export class OperatorTorlesComponent implements OnInit {

  private _operator: __Operator;

  constructor(@Inject(MAT_DIALOG_DATA) private operator: __Operator,
              private __operatorService: OperatorService) {
    this._operator = operator;
  }

  ngOnInit() {
  }

  /**
   * Kiválasztott operátor törlése.
   * @param operator
   */
  private operatorTorlese(operator: __Operator) {
    this.__operatorService.deleteOperatorDELETE(operator.id.toString()).subscribe();
  }
}
