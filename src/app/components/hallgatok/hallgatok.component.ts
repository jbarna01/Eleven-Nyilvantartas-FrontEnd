import {Component, Input, OnInit} from '@angular/core';
import {GlobalsService} from "../../services/globals.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hallgatok',
  templateUrl: './hallgatok.component.html',
  styleUrls: ['./hallgatok.component.css']
})
export class HallgatokComponent implements OnInit {

  isBelepve: boolean;


  constructor(private global: GlobalsService,
              private router: Router) { }

  ngOnInit() {
    this.global.isBelepve.subscribe(isBelepve => this.isBelepve = isBelepve)
    if (!this.isBelepve) {
      console.log('Nincs belépve senki');
      this.router.navigate(['']);
    }
  }

}
