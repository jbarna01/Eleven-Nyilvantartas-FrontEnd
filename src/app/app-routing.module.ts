import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OperatorokComponent} from "./components/operatorok/operatorok.component";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";
import {CimsorComponent} from "./components/cimsor/cimsor.component";
import {HallgatokComponent} from "./components/hallgatok/hallgatok.component";


const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "cimsor", component: CimsorComponent },
  { path: "cimsor/:isBelepve", component: CimsorComponent },
  { path: "login/:isBelepve", component: LoginComponent },
  { path: "operatorok", component: OperatorokComponent },
  { path: "hallgatok", component: HallgatokComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
