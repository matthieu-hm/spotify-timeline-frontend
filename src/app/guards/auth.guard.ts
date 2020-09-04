import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): true | UrlTree {
    const accessToken = this.cookieService.get('access_token');

    if (accessToken) {
      return true;
    }

    // Redirect to the login page
    return this.router.createUrlTree(['/login']);
  }
}