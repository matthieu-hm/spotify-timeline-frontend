import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromAuthActions from '../actions/auth.actions';
import * as fromAuthReducers from '../reducers/auth.reducer';
import { AppTokens } from '../models/app-common-objects';

@Injectable()
export class AuthFacade {
  currentUser$ = this.store.pipe(select(fromAuthReducers.selectCurrentUser));
  isAuthenticated$ = this.store.pipe(select(fromAuthReducers.selectIsAuthenticated));
  modalIsOpened$ = this.store.pipe(select(fromAuthReducers.selectModalIsOpened));
  getUserIsInProgress$ = this.store.pipe(select(fromAuthReducers.selectGetUserIsInProgress));
  loginIsInProgress$ = this.store.pipe(select(fromAuthReducers.selectLoginIsInProgress));

  constructor(
    private store: Store<fromAuthReducers.State>
  ) {}

  init(appTokens: AppTokens): void {
    this.store.dispatch(fromAuthActions.init(appTokens));
  }

  openAuthModal(): void {
    this.store.dispatch(fromAuthActions.openAuthModal());
  }

  queryCurrentUser(): void {
    this.store.dispatch(fromAuthActions.queryCurrentUser());
  }

  logout(): void {
    this.store.dispatch(fromAuthActions.logout());
  }

  receivedUnauthenticatedResponse(): void {
    this.store.dispatch(fromAuthActions.receivedUnauthenticatedResponse());
  }
}
