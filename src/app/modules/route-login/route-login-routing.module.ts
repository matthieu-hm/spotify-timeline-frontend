import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteLoginComponent } from './route-login.component';

const routes: Routes = [{ path: '', component: RouteLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteLoginRoutingModule { }
