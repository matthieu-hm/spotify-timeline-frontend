import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';

import { CurrentUser } from '../models/current-user.model';
import * as authActions from '../actions/auth.actions';
// import { AppTokens } from '../models/app-common-objects';

export interface State {
  // tokens: AppTokens;
  currentUser: CurrentUser | null;
  getUserIsInProgress: boolean;
  modalIsOpened: boolean;
}

const initialState: State = {
  // tokens: {
  //   access: null,
  //   refresh: null,
  // },
  currentUser: null,
  getUserIsInProgress: false,
  modalIsOpened: false,
};

// REDUCER
// ------

const authReducer = createReducer(
  initialState,
  // on(
  //   authActions.init,
  //   (state, payload) => {
  //     return {
  //       ...state,
  //       tokens: {
  //         ...state.tokens,
  //         access: payload.access,
  //         refresh: payload.refresh,
  //       }
  //     };
  //   }
  // ),
  on(
    authActions.openAuthModal,
      (state, payload) => {
        return {
          ...state,
          modalIsOpened: true,
        };
      }
  ),
  on(
    authActions.closeAuthModal,
      (state, payload) => {
        return {
          ...state,
          modalIsOpened: false,
        };
      }
  ),
  on(
    authActions.queryCurrentUser,
      (state, payload) => {
        return {
          ...state,
          getUserIsInProgress: true,
        };
      }
  ),
  on(
    authActions.queryCurrentUserSuccess,
      (state, payload) => {
        return {
          ...state,
          currentUser: payload.currentUser,
          getUserIsInProgress: false,
        };
      }
  ),
  on(
    authActions.queryCurrentUserError,
      (state, payload) => {
        return {
          ...state,
          getUserIsInProgress: false,
        };
      }
  ),
  on(
    authActions.logout,
      (state, payload) => {
        return {
          ...state,
          // tokens: {
          //   ...state.tokens,
          //   access: null,
          //   refresh: null,
          // }
          currentUser: null,
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
  state => !!state.currentUser
);

export const selectModalIsOpened = createSelector(
  featureSelector,
  state => state.modalIsOpened
);

export const selectGetUserIsInProgress = createSelector(
  featureSelector,
  state => state.getUserIsInProgress
);

export const selectLoginIsInProgress = createSelector(
  featureSelector,
  state => state.modalIsOpened || state.getUserIsInProgress
);
