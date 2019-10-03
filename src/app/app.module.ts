import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { OperatorokComponent } from './components/operatorok/operatorok.component';
import { CimsorComponent } from './components/cimsor/cimsor.component';
import { HallgatokComponent } from './components/hallgatok/hallgatok.component';
import { OperatorDialogComponent } from './components/operatorok/operator-dialog/operator-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    OperatorokComponent,
    CimsorComponent,
    HallgatokComponent,
    OperatorDialogComponent,
  ],
  entryComponents: [OperatorDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  public isBelepveGlobal = false;

}
