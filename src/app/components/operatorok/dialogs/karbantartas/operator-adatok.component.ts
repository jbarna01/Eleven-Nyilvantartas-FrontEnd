import {Component, Inject, OnInit} from '@angular/core';
import {Operator, Operator as __Operator} from "../../../../models/Operator";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {JelszoModositasComponent} from "../jelszoModositas/jelszoModositas.component";

@Component({
  selector: 'app-operator-adatok',
  templateUrl: './operator-adatok.component.html',
  styleUrls: ['./operator-adatok.component.css']
})
export class OperatorAdatokComponent implements OnInit {

  private _operator: __Operator;
  private _jelszoModositasUzenet: string;
  private _ujOperator: boolean;
  private _ujJelszo1: string;
  private _ujJelszo2: string;

  constructor(@Inject(MAT_DIALOG_DATA) private operator: __Operator,
              private router: Router,
              private dialog: MatDialog) {
    this._operator = operator;
    this._ujOperator = this._operator.id == null;
    console.log(operator.jogok[0].megnevezes)
  }
  ngOnInit() {
  }

  jelszoValtoztatas(operator: __Operator) {
    let dialogRef = this.dialog.open(JelszoModositasComponent, {data: operator, disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
     result.data?this._jelszoModositasUzenet = '#':null;
    })
  }
}
