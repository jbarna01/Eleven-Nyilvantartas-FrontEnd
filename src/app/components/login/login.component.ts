import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalsService} from "../../services/globals.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName = '';
  public password = '';
  isBelepve: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private global: GlobalsService) { }

  ngOnInit() {
    this.global.isBelepve.subscribe(isBelepve => this.isBelepve = isBelepve)
  }

  belepes() {
    if ((this.userName == '1') && (this.password = '1')) {
      console.log('Belépve');
      this.global.changeLogin(true);
      this.router.navigate(['cimsor',1])
    } else {
      console.log('Nem sikerült.')
    }
  }

}
