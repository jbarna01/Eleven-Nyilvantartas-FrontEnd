import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import huHU from '@translations/hu-HU.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private translateService: TranslateService
  ) {}
  ngOnInit() {
    this.translateService.setTranslation('hu-HU', huHU, true);
  }

}



