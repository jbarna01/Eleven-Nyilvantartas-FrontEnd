import {Component, Inject, OnInit} from '@angular/core';
import {Operator, Operator as __Operator} from "../../../../models/Operator";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {JelszoModositasComponent} from "../jelszoModositas/jelszoModositas.component";
import {GlobalsService} from "../../../../services/globals.service";
import {OperatorService} from "../../../../services/operator.service";
import {JogokService} from "../../../../services/jogok.service";
import {Jogok} from "../../../../models/Jogok";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-operator-adatok',
  templateUrl: './operator-adatok.component.html',
  styleUrls: ['./operator-adatok.component.css']
})
export class OperatorAdatokComponent implements OnInit {

  private _operator: __Operator;
  private _felhasznaloJoga: string;
  private _aktualisJog: string;
  private _jogokLista: Jogok[];
  private _jelszoModositasUzenet: string;
  private _ujOperator: boolean;
  private _ujJelszo1: string;
  private _ujJelszo2: string;

  constructor(@Inject(MAT_DIALOG_DATA) private operator: __Operator,
              private __jogokService: JogokService,
              private __router: Router,
              private __global: GlobalsService,
              private __dialog: MatDialog) {
    this._operator = operator;
    this._ujOperator = this._operator.id == null;
  }
  ngOnInit() {
    this.__global._felhasznaloJoga.subscribe(felhasznaloJoga => this._felhasznaloJoga = felhasznaloJoga.toString());
    this.jogokFeltoltese();
  }

  jogokFeltoltese() {
    if (this._felhasznaloJoga === 'ADMIN') {
      this._aktualisJog = this._operator.jogok[0].code;
      this.__jogokService.getJogok().subscribe( jogok => {
        this._jogokLista = jogok;
      });
    }
  }

  jelszoValtoztatas(operator: __Operator) {
    let dialogRef = this.__dialog.open(JelszoModositasComponent, {data: operator, disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
     result.data?this._jelszoModositasUzenet = '#':null;
    })
  }
}
