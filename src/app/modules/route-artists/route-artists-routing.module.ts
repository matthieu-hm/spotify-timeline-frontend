import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteArtistsComponent } from './route-artists.component';

const routes: Routes = [{ path: '', component: RouteArtistsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteArtistsRoutingModule { }
