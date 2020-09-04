import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteLoginRoutingModule } from './route-login-routing.module';
import { RouteLoginComponent } from './route-login.component';
import { LoginButtonComponent } from './login-button/login-button.component';


@NgModule({
  declarations: [
    RouteLoginComponent,
    LoginButtonComponent
  ],
  imports: [
    CommonModule,
    RouteLoginRoutingModule
  ]
})
export class RouteLoginModule { }
