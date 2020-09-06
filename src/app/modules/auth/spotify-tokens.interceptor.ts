import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { AuthFacade } from '../app-store/facades/auth.facade';

@Injectable()
export class SpotifyTokensInterceptor implements HttpInterceptor {

  private isRefreshTokenPending$: Observable<boolean>;

  constructor(
    private cookieService: CookieService,
    private authFacade: AuthFacade
  ) {
    this.isRefreshTokenPending$ = this.authFacade.isRefreshTokenPending$;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf(environment.spotifyApiUrl) !== -1) {
      return this.interceptSpotifyApiRequest(request, next);
    }

    return next.handle(request);
  }

  interceptSpotifyApiRequest(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.isRefreshTokenPending$
      .pipe(
        take(1),
        switchMap(isRefreshTokenPending => {
          if (isRefreshTokenPending) {
            return this.deferRequestUntilRefreshTokenIsComplete(request, next);
          }

          return this.intercept401Error(request, next);
        })
      );
  }

  deferRequestUntilRefreshTokenIsComplete(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.isRefreshTokenPending$
      .pipe(
        filter(isRefreshTokenPending => isRefreshTokenPending === false),
        take(1),
        switchMap(() => this.addAuthorizationHeader(request, next))
      );
  }

  intercept401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this
      .addAuthorizationHeader(request, next)
      .pipe(
        catchError(error => {
          // If error status is different than 401 we want to skip refresh token
          // So we check that and throw the error if it's the case
          if (error.status !== 401) {
            return throwError(error);
          }

          this.authFacade.refreshToken();

          return this.deferRequestUntilRefreshTokenIsComplete(request, next);
        })
      );
  }

  addAuthorizationHeader(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.cookieService.get('access_token');

    if (!accessToken) {
      this.authFacade.refreshToken();

      return this.deferRequestUntilRefreshTokenIsComplete(request, next);
    }

    const requestClone = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });


    return next.handle(requestClone);
  }
}
