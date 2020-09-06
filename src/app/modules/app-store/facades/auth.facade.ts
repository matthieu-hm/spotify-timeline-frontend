import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromAuthActions from '../actions/auth.actions';
import * as fromAuthReducers from '../reducers/auth.reducer';
import { AppTokens } from '../models/app-common-objects';

@Injectable()
export class AuthFacade {
  currentUser$ = this.store.pipe(select(fromAuthReducers.selectCurrentUser));
  isAuthenticated$ = this.store.pipe(select(fromAuthReducers.selectIsAuthenticated));
  isLoginPending$ = this.store.pipe(select(fromAuthReducers.selectIsLoginPending));
  isQueryCurrentUserPending$ = this.store.pipe(select(fromAuthReducers.selectIsQueryCurrentUserPending));
  isRefreshTokenPending$ = this.store.pipe(select(fromAuthReducers.selectIsRefreshTokenPending));

  constructor(
    private store: Store<fromAuthReducers.State>
  ) {}

  init(appTokens: AppTokens): void {
    this.store.dispatch(fromAuthActions.init(appTokens));
  }

  login(): void {
    this.store.dispatch(fromAuthActions.login());
  }

  queryCurrentUser(): void {
    this.store.dispatch(fromAuthActions.queryCurrentUser());
  }

  logout(): void {
    this.store.dispatch(fromAuthActions.logout());
  }

  refreshToken(): void {
    this.store.dispatch(fromAuthActions.refreshToken());
  }
}
