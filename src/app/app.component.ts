import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import {environment} from "../environments/environment";
import {merge} from "rxjs";
import {I18nService} from "./api/nyilvantartas/services/i18n.service";
import huHU from '@translations/hu-HU.json';
import helpLocalizations from '@translations/nyilvantartas_lokalizalt_help.json';

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
    private translateService: TranslateService,
    private i18nService: I18nService
  ) {}
  ngOnInit() {
    // Setup translations
    this.translateService.setTranslation('hu-HU', huHU, true);
    // this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
    this.i18nService.initHelpTranslation(helpLocalizations);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });

    this.titleService.setTitle(this.translateService.instant('NYILVANTARTAS.PAGE_TITLE'));

  }

}



