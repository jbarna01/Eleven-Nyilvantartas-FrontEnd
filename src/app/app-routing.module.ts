import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CimsorComponent} from './nyilvantartas/cimsor/cimsor.component';
import {HallgatokComponent} from './nyilvantartas/hallgatok/hallgatok.component';
import {LoginComponent} from './nyilvantartas/login/login.component';
import {OperatorokComponent} from './nyilvantartas/operatorok/operatorok.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cimsor', component: CimsorComponent },
  { path: 'cimsor/:isBelepve', component: CimsorComponent },
  { path: 'login/:isBelepve', component: LoginComponent },
  { path: 'operatorok', component: OperatorokComponent },
  { path: 'hallgatok', component: HallgatokComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]})

export class AppRoutingModule { }
