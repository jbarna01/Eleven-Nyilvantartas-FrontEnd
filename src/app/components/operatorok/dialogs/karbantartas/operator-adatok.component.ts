import {Component, Inject, OnInit} from '@angular/core';
import {Operator, Operator as __Operator} from "../../../../models/Operator";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {JelszoModositasComponent} from "../jelszo-modositas/jelszo-modositas.component";

@Component({
  selector: 'app-operator-adatok',
  templateUrl: './operator-adatok.component.html',
  styleUrls: ['./operator-adatok.component.css']
})
export class OperatorAdatokComponent implements OnInit {

  private _operator: __Operator;

  constructor(@Inject(MAT_DIALOG_DATA) private operator: __Operator,
              private router: Router,
              private dialog: MatDialog) {
    this._operator = operator;
  }
  ngOnInit() {
  }

  jelszoValtoztatas(operator: __Operator) {
    let dialogRef = this.dialog.open(JelszoModositasComponent, {data: operator});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialaog válasz: ${result}`);
    })
  }

}
