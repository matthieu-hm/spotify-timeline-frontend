import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, debounceTime, take } from 'rxjs/operators';
// import { LocalStorageService } from 'ngx-localstorage';

import { environment } from '../../../../environments/environment';

import * as authActions from '../actions/auth.actions';
import { AuthFacade } from '../facades/auth.facade';
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

  @Effect({ dispatch: false })
  openAuthModal$ = this.actions$.pipe(
    ofType(authActions.openAuthModal),
    tap(action => {
      this.windowPopupService.open(this.loginHref, null, null, () => {
          this.store.dispatch(authActions.closeAuthModal());
      });
    })
  );

  @Effect()
  closeAuthModal$ = this.actions$.pipe(
    ofType(authActions.closeAuthModal),
    map(action => {
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
      // TODO: Delete token cookie
      this.cookieService.delete('access_token');
      this.cookieService.delete('refresh_token');
    })
  );

  @Effect({ dispatch: false })
  receiveUnauthenticatedResponse$ = this.actions$.pipe(
    ofType(authActions.receivedUnauthenticatedResponse),
    map(action => {
      // TODO: Try refresh token
    })
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private authFacade: AuthFacade,
    private authService: AuthService,
    private windowPopupService: WindowPopupService,
    private cookieService: CookieService,
  ) {}
}
