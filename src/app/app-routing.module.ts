import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteHomeModule } from './modules/route-home/route-home.module';
import { RouteHomeComponent } from './modules/route-home/route-home.component';
import { RouteError404Module } from './modules/route-error-404/route-error-404.module';
import { RouteError404Component } from './modules/route-error-404/route-error-404.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: RouteHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'artists',
    loadChildren: () => import('./modules/route-artists/route-artists.module').then(m => m.RouteArtistsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/route-login/route-login.module').then(m => m.RouteLoginModule),
    canActivate: [NotAuthGuard]
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
