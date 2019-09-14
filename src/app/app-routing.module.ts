import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {OperatorokComponent} from "./components/operatorok/operatorok.component";
import {MenuComponent} from "./components/menu/menu.component";
import {AppComponent} from "./app.component";


const routes: Routes = [
  {path: "operatorok", component: OperatorokComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
