import {Component, Input, OnInit} from '@angular/core';
import {Router as __Router} from '@angular/router';
import {GlobalsService as __GlobalsService} from '../../api/nyilvantartas/services/globals.service';

@Component({
  selector: 'app-hallgatok',
  templateUrl: './hallgatok.component.html',
  styleUrls: ['./hallgatok.component.css']})
export class HallgatokComponent implements OnInit {

  _isBelepve: boolean;

  constructor(private global: __GlobalsService,
              private router: __Router) { }

  ngOnInit() {
    this.global._isBelepve.subscribe(isBelepve => this._isBelepve = isBelepve );
    if (!this._isBelepve) {
      this.router.navigate(['']);
    }
  }

}
