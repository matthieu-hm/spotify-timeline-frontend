import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';

import { CurrentUser } from '../models/current-user.model';
import * as authActions from '../actions/auth.actions';

export interface State {
  currentUser: CurrentUser | null;
  isQueryCurrentUserPending: boolean;
  isLoginPending: boolean;
  isAuthenticated: boolean;
}

const initialState: State = {
  currentUser: null,
  isQueryCurrentUserPending: false,
  isLoginPending: false,
  isAuthenticated: false,
};

// REDUCER
// ------

const authReducer = createReducer(
  initialState,
  on(
    authActions.init,
    (state, payload) => {
      return {
        ...state,
        isAuthenticated: (!!payload.access && !!payload.refresh),
      };
    }
  ),
  on(
    authActions.loginOpenModal,
    (state, payload) => {
      return {
        ...state,
        isLoginPending: true,
      };
    }
  ),
  on(
    authActions.loginCloseModal,
    (state, payload) => {
      return {
        ...state,
        isLoginPending: false,
      };
    }
  ),
  on(
    authActions.loginSuccess,
    (state, payload) => {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
  ),
  on(
    authActions.loginFail,
    (state, payload) => {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
  ),
  on(
    authActions.queryCurrentUser,
    (state, payload) => {
      return {
        ...state,
        isQueryCurrentUserPending: true,
      };
    }
  ),
  on(
    authActions.queryCurrentUserSuccess,
    (state, payload) => {
      return {
        ...state,
        currentUser: payload.currentUser,
        isQueryCurrentUserPending: false,
      };
    }
  ),
  on(
    authActions.queryCurrentUserError,
    (state, payload) => {
      return {
        ...state,
        isQueryCurrentUserPending: false,
      };
    }
  ),
  on(
    authActions.logout,
    (state, payload) => {
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };
    }
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

// SELECTORS
// ------

const featureSelector = createFeatureSelector<State>('auth');

export const selectCurrentUser = createSelector(
  featureSelector,
  state => state.currentUser
);

export const selectIsAuthenticated = createSelector(
  featureSelector,
  state => state.isAuthenticated
);

export const selectIsLoginPending = createSelector(
  featureSelector,
  state => state.isLoginPending
);

export const selectIsQueryCurrentUserPending = createSelector(
  featureSelector,
  state => state.isQueryCurrentUserPending
);
