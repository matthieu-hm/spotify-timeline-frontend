import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Artist } from '../models/artist';
import * as artistActions from '../actions/artist.actions';

export interface State extends EntityState<Artist> {
  // additional entity state properties
  cursors: { after: string; } | null;
  total: number | null;
}

export const adapter: EntityAdapter<Artist> = createEntityAdapter<Artist>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  cursors: null,
  total: null
});

const artistReducer = createReducer(
  initialState,
  on(
    artistActions.queryAllFollowedSuccess,
    (state, payload) => {
      return adapter.upsertMany(payload.artists.items, {
        ...state,
        cursors: payload.artists.cursors,
        total: payload.artists.total,
      });
    }
  )
);

export function reducer(state: State | undefined, action: Action): State {
  return artistReducer(state, action);
}
