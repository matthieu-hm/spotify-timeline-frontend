import { createAction, props } from '@ngrx/store';

import { AppTokens } from '../models/app-common-objects';
import { CurrentUser } from '../models/current-user.model';

export const init = createAction(
  '[Auth] init',
  props<AppTokens>()
);

export const login = createAction('[Auth] login');
export const loginOpenModal = createAction('[Auth] login/open-modal');
export const loginCloseModal = createAction('[Auth] login/close-modal');
export const loginSuccess = createAction('[Auth] login/success');
export const loginFail = createAction('[Auth] login/fail');
export const loginCancel = createAction('[Auth] login/cancel');

export const receivedUnauthenticatedResponse = createAction('[auth] received-unauthenticated-response');

export const queryCurrentUser = createAction('[Auth] query-current-user');
export const queryCurrentUserSuccess = createAction(
  '[Auth] query-current-user/success',
  props<{ currentUser: CurrentUser }>()
);
export const queryCurrentUserError = createAction(
  '[Auth] query-current-user/error',
  props<any>()
);

export const logout = createAction('[Auth] logout');
