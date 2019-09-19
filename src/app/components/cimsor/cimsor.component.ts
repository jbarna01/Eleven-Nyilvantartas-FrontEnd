import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-cimsor',
  templateUrl: './cimsor.component.html',
  styleUrls: ['./cimsor.component.css']
})
export class CimsorComponent implements OnInit {

  public isBelepve;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.isBelepve = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let isLogin = parseInt(params.get('isBelepve'));
      this.isBelepve = isLogin==1?true:false;
    })
  }

  hallagoiLista() {
    console.log("Hallagtói lista")
  }

  torzs() {
    console.log("Törzsadat")
  }

  logout() {
    this.isBelepve = false;
    this.router.navigate([''])
  }


}
