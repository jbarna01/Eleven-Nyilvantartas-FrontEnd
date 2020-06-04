import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {GlobalsService} from '../api/nyilvantartas/services/globals.service';

const CLIENT_ID_KEY = 'client_id';
const CLIENT_SECRET_KEY = 'client_secret';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private _belepettFelhasznaloId: string;

  constructor(private global: GlobalsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this._belepettFelhasznaloId = this.global.getFelhasznaloId().getValue().toString();
    let authReq: HttpRequest<any>;

    if (this._belepettFelhasznaloId === undefined || this._belepettFelhasznaloId === '0') {
      authReq = req.clone({
        headers: req.headers
          .append(CLIENT_ID_KEY, environment.clientId)
          .append(CLIENT_SECRET_KEY, environment.clientSecret)});
    } else {
      authReq = req.clone({
        headers: req.headers
          .append(CLIENT_ID_KEY, environment.clientId)
          .append(CLIENT_SECRET_KEY, environment.clientSecret)
          .append('user_id', this._belepettFelhasznaloId.toString())});
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
];
