import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteHomeModule } from './modules/route-home/route-home.module';
import { RouteHomeComponent } from './modules/route-home/route-home.component';
import { RouteError404Module } from './modules/route-error-404/route-error-404.module';
import { RouteError404Component } from './modules/route-error-404/route-error-404.component';

const routes: Routes = [
  {
    path: '',
    component: RouteHomeComponent
  },
  {
    path: 'artists',
    loadChildren: () => import('./modules/route-artists/route-artists.module').then(m => m.RouteArtistsModule)
  },
  {
    path: '**',
    component: RouteError404Component
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouteHomeModule,
    RouteError404Module,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
