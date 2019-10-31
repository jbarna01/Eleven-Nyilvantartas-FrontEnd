import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./core/material.module";
import { MenuComponent } from './nyilvantartas/menu/menu.component';
import { LoginComponent } from './nyilvantartas/login/login.component';
import { OperatorokComponent } from './nyilvantartas/operatorok/operatorok.component';
import { CimsorComponent } from './nyilvantartas/cimsor/cimsor.component';
import { HallgatokComponent } from './nyilvantartas/hallgatok/hallgatok.component';
import {OperatorTorlesComponent} from "./nyilvantartas/operatorok/dialogs/torles/operator-torles.component";
import { OperatorAdatokComponent } from './nyilvantartas/operatorok/dialogs/karbantartas/operator-adatok.component';
import { JelszoModositasComponent } from './nyilvantartas/operatorok/dialogs/jelszoModositas/jelszoModositas.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    OperatorokComponent,
    CimsorComponent,
    HallgatokComponent,
    OperatorTorlesComponent,
    OperatorAdatokComponent,
    JelszoModositasComponent
  ],
  entryComponents: [OperatorTorlesComponent, OperatorAdatokComponent, JelszoModositasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    TranslateModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  public isBelepveGlobal = false;

}
