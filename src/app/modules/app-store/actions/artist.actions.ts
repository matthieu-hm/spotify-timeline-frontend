import { createAction, props } from '@ngrx/store';
import { ArtistFollowedPaging } from '../models/artist.model';

export const queryAllFollowed = createAction('[Artist] query-all-followed');
export const queryAllFollowedSuccess = createAction(
  '[Artist] query-all-followed/success',
  props<ArtistFollowedPaging>()
);
export const queryAllFollowedError = createAction(
  '[Artist] query-all-followed/error',
  props<any>()
);
