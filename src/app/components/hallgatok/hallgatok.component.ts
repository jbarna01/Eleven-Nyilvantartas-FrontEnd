import {Component, Input, OnInit} from '@angular/core';
import {GlobalsService as __GlobalsService} from "../../services/globals.service";
import {Router as __Router} from "@angular/router";

@Component({
  selector: 'app-hallgatok',
  templateUrl: './hallgatok.component.html',
  styleUrls: ['./hallgatok.component.css']
})
export class HallgatokComponent implements OnInit {

  private _isBelepve: boolean;

  constructor(private global: __GlobalsService,
              private router: __Router) { }

  ngOnInit() {
    this.global._isBelepve.subscribe(isBelepve => this._isBelepve = isBelepve)
    if (!this._isBelepve) {
      this.router.navigate(['']);
    }
  }

}
