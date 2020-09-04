import { createAction, props } from '@ngrx/store';

import { AppTokens } from '../models/app-common-objects';
import { CurrentUser } from '../models/current-user.model';

export const init = createAction(
  '[Auth] init',
  props<AppTokens>()
);

export const openAuthModal = createAction('[Auth] auth-modal/open');
export const closeAuthModal = createAction('[Auth] auth-modal/close');

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
