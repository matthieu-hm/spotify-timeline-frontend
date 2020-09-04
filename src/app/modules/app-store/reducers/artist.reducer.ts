import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Artist } from '../models/artist.model';
import { SpotifyCursor } from '../models/spotify-common-objects';
import * as artistActions from '../actions/artist.actions';

export interface State extends EntityState<Artist> {
  // additional entity state properties
  cursors: SpotifyCursor | null;
  total: number | null;
}

export const adapter: EntityAdapter<Artist> = createEntityAdapter<Artist>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  cursors: null,
  total: null
});

// REDUCER
// ------

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

// SELECTORS
// ------

const featureSelector = createFeatureSelector<State>('artists');

export const selectIds = createSelector(
  featureSelector,
  adapter.getSelectors().selectIds // shorthand for state => adapter.getSelectors().selectIds(state)
);

export const selectEntities = createSelector(
  featureSelector,
  adapter.getSelectors().selectEntities
);

export const selectAll = createSelector(
  featureSelector,
  adapter.getSelectors().selectAll
);

export const selectTotalLoaded = createSelector(
  featureSelector,
  adapter.getSelectors().selectTotal
);

export const selectCursors = createSelector(
  featureSelector,
  state => state.cursors
);

export const selectTotal = createSelector(
  featureSelector,
  state => state.total
);
