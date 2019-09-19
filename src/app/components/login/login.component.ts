import {Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName = '';
  public password = '';

  @Input('paramData') public isBelepve;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }

  belepes() {
    if ((this.userName == '1') && (this.password = '1')) {
      console.log('Belépve');
      this.isBelepve = true;
      this.router.navigate(['cimsor',1])

    } else {
      console.log('Nem sikerült.')
    }
  }

}
