import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import * as authActions from '../actions/auth.actions';
import { AuthService } from '../../auth/auth.service';
import { WindowPopupService } from 'src/app/services/window-popup.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthEffects {

  private loginHref = environment.appApiUrl + 'spotify-api/login';

  @Effect({ dispatch: false })
  init$ = this.actions$.pipe(
    ofType(authActions.init),
    tap(action => {
      if (action.access && action.refresh) {
        this.store.dispatch(authActions.queryCurrentUser());
      }
    })
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(authActions.login),
    map(action => {
      const accessToken = this.cookieService.get('access_token');
      const refreshToken = this.cookieService.get('refresh_token');

      if (accessToken && refreshToken) {
        // Already logged in
        return authActions.loginCancel();
      }

      return authActions.loginOpenModal();
    })
  );

  @Effect({ dispatch: false })
  loginOpenModal$ = this.actions$.pipe(
    ofType(authActions.loginOpenModal),
    tap(action => {
      this.windowPopupService.open(this.loginHref, null, null, () => {
          this.store.dispatch(authActions.loginCloseModal());
      });
    })
  );

  @Effect()
  loginCloseModal$ = this.actions$.pipe(
    ofType(authActions.loginCloseModal),
    map(action => {
      const accessToken = this.cookieService.get('access_token');
      const refreshToken = this.cookieService.get('refresh_token');

      if (accessToken && refreshToken) {
        return authActions.loginSuccess();
      }

      return authActions.loginFail();
    })
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(authActions.loginSuccess),
    map(action => {
      this.router.navigate(['/']);

      return authActions.queryCurrentUser();
    })
  );

  @Effect()
  queryCurrentUser$ = this.actions$.pipe(
    ofType(authActions.queryCurrentUser),
    switchMap(action =>
      this.authService
        .getCurrentUser()
        .pipe(
          map(response => authActions.queryCurrentUserSuccess(response)),
          catchError(error => of(authActions.queryCurrentUserError(error)))
        )
    )
  );

  // @Effect()
  // queryCurrentUserSuccessOrError$ = this.actions$.pipe(
  //   ofType(
  //     authActions.queryCurrentUserSuccess,
  //     authActions.queryCurrentUserError
  //   ),
  //   map(() => authActions.queryCurrentUserComplete())
  // );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(authActions.logout),
    tap(action => {
      this.cookieService.delete('access_token');
      this.cookieService.delete('refresh_token');

      this.router.navigate(['/login']);
    })
  );

  @Effect()
  receiveUnauthenticatedResponse$ = this.actions$.pipe(
    ofType(authActions.receivedUnauthenticatedResponse),
    map(action => {
      // TODO: Try refresh token
      return authActions.logout();
    })
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private windowPopupService: WindowPopupService,
    private cookieService: CookieService,
  ) {}
}
