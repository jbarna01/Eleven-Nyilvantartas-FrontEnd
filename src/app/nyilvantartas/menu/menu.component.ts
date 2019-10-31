import {Component, Input, OnInit} from '@angular/core';
import {AppModule} from "../../app.module";
import {AppComponent} from "../../app.component";
import {CoreService} from "../../api/nyilvantartas/services/core.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  menuUrl:any = {};
  menuNev:any = {};

  @Input('paramData') public isBelepve ;


  constructor(private core: CoreService) {
    this.menuNev['kilepes'] = 'Kilépés';
    this.menuUrl['kilepes'] = 'login';
  }

  valtas() {
    if (this.core.isBelepve) {
      this.menuUrl['kilepes'] = 'operatorok';
      this.core.isMenuLathato = true;
    }
    else {
      this.menuUrl['kilepes'] = 'login';
      this.core.isMenuLathato = false;
    }
  }

  ngOnInit() {
  }


}
