import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import huHU from '@translations/hu-HU.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService
  ) {}
  ngOnInit() {
    this.translateService.setTranslation('hu-HU', huHU, true);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

  }

}



