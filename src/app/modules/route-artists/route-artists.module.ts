import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteArtistsRoutingModule } from './route-artists-routing.module';
import { RouteArtistsComponent } from './route-artists.component';


@NgModule({
  declarations: [RouteArtistsComponent],
  imports: [
    CommonModule,
    RouteArtistsRoutingModule
  ]
})
export class RouteArtistsModule { }
