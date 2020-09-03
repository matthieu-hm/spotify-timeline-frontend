import { createAction, props } from '@ngrx/store';
import { ArtistFollowedResponse } from '../models/artist';

export const queryAllFollowed = createAction('[Artist] query-all-followed');
export const queryAllFollowedSuccess = createAction(
  '[Artist] query-all-followed/success',
  props<ArtistFollowedResponse>()
);
export const queryAllFollowedError = createAction(
  '[Artist] query-all-followed/error',
  props<{ error: any }>()
);

export const queryFollowed = createAction('[Artist] query-followed');
export const queryFollowedSuccess = createAction(
  '[Artist] query-followed/success',
  props<ArtistFollowedResponse>()
);
export const queryFollowedError = createAction(
  '[Artist] query-followed/error',
  props<{ error: any }>()
);
