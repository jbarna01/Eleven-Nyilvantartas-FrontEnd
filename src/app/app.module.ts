import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {authInterceptorProviders} from './auth/auth.interceptor';
import { MaterialModule } from './core/material.module';
import { CimsorComponent } from './nyilvantartas/cimsor/cimsor.component';
import { HallgatokComponent } from './nyilvantartas/hallgatok/hallgatok.component';
import { LoginComponent } from './nyilvantartas/login/login.component';
import { MenuComponent } from './nyilvantartas/menu/menu.component';
import { JelszoModositasComponent } from './nyilvantartas/operatorok/dialogs/jelszoModositas/jelszoModositas.component';
import { OperatorAdatokComponent } from './nyilvantartas/operatorok/dialogs/karbantartas/operator-adatok.component';
import { OperatorokComponent } from './nyilvantartas/operatorok/operatorok.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    OperatorokComponent,
    CimsorComponent,
    HallgatokComponent,
    OperatorAdatokComponent,
    JelszoModositasComponent,
  ],
  entryComponents: [OperatorAdatokComponent, JelszoModositasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    TranslateModule.forRoot(),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {

  public isBelepveGlobal = false;

}
