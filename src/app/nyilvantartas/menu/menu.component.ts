import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CoreService} from '../../api/nyilvantartas/services/core.service';
import {GlobalsService} from '../../api/nyilvantartas/services/globals.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']})

export class MenuComponent implements OnInit {

  menuUrl: any = {};
  menuNev: any = {};

  @Input('paramData') public isBelepve ;

  constructor(private core: CoreService,
              private route: ActivatedRoute,
              private router: Router,
              private global: GlobalsService) {
    this.menuNev['kilepes'] = 'Kilépés';
    this.menuUrl['kilepes'] = 'login';
  }

  valtas() {
    if (this.core.isBelepve) {
      this.menuUrl['kilepes'] = 'operatorok';
      this.core.isMenuLathato = true;
    } else {
      this.menuUrl['kilepes'] = 'login';
      this.core.isMenuLathato = false;
    }
  }

  ngOnInit() {
  }

  torzs() {
    this.router.navigate(['operatorok']);
  }

}
