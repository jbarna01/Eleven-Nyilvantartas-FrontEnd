import {Component, Input, OnInit} from '@angular/core';
import {GlobalsService} from "../../services/globals.service";

@Component({
  selector: 'app-hallgatok',
  templateUrl: './hallgatok.component.html',
  styleUrls: ['./hallgatok.component.css']
})
export class HallgatokComponent implements OnInit {

  isBelepve: boolean;


  constructor(private global: GlobalsService) { }

  ngOnInit() {
    this.global.isBelepve.subscribe(isBelepve => this.isBelepve = isBelepve)
  }

}
