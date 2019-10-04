import { Component, OnInit, ViewChild } from '@angular/core';
import {Operator} from "../../models/Operator";
import {OperatorService} from "../../services/operator.service";
import {GlobalsService} from "../../services/globals.service";
import {Router} from "@angular/router";
import {MatTableDataSource, MatSort, MatPaginator} from "@angular/material";
import {MatDialog} from "@angular/material/dialog";
import {DialogsComponent} from "./dialogs/dialogs.component";

@Component({
  selector: 'app-operatorok',
  templateUrl: './operatorok.component.html',
  styleUrls: ['./operatorok.component.css']
})
export class OperatorokComponent implements OnInit {

  // operatorokLista: Operator[];
  operatorokLista =  new MatTableDataSource<Operator>();
  isBelepve: boolean;
  displayedHeadColums: string[] = ['id', 'vezeteknev', 'keresztnev', 'username', 'password', 'aktiv', 'edit', 'delete'];
  displayedRowColums: string[] = ['id', 'vezeteknev', 'keresztnev', 'username', 'password', 'aktiv', 'edit', 'delete'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private operatorService: OperatorService,
              private global: GlobalsService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.global.isBelepve.subscribe(isBelepve => this.isBelepve = isBelepve)
    if (!this.isBelepve) {
      console.log('Nincs belépve senki');
      this.router.navigate(['']);
    } else {
        this.operatorService.getOperatorok().subscribe(operatorok => {
        this.operatorokLista = new MatTableDataSource(operatorok);
        this.operatorokLista.sort = this.sort;
          this.operatorokLista.paginator = this.paginator;
      })
    }
  }

  private felhasznaloKivalaszt(row) {
    console.log(row);
  }

  applyFilter(filterValue: string) {
    this.operatorokLista.filter = filterValue.trim().toLowerCase();
  }

  operatorTorlese(id: string) {
    this.dialog.open(DialogsComponent)
  }

  operatorKarbantartasa(operator: Operator) {

  }
}
