import {Component, Inject, OnInit} from '@angular/core';
import {Operator as __Operator} from "../../../../models/Operator";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {OperatorService} from "../../../../services/operator.service";
import {HttpParams as __HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-operator-torles',
  templateUrl: './operator-torles.component.html',
  styleUrls: ['./operator-torles.component.css']
})
export class OperatorTorlesComponent implements OnInit {

  private _operator: __Operator;
  // private _params: __HttpParams;

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
    // this._params = this.setParameters(operator.id.toString());
    this.__operatorService.deleteOperatorDELETE(operator.id.toString()).subscribe();
  }

  /**
   * Törléshez tartozó paraméterek beállítása.
   * @param id
   */
  // private setParameters(id: string): __HttpParams {
  //   const params = new __HttpParams()
  //     .set('id', id);
  //   return params;
  // }

}
