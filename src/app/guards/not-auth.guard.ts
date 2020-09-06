import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): true | UrlTree {
    const accessToken = this.cookieService.get('access_token');
    const refreshToken = this.cookieService.get('refresh_token');

    if (!accessToken && !refreshToken) {
      return true;
    }

    // Redirect to the home page
    return this.router.createUrlTree(['/']);
  }
}
