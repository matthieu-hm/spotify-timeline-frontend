import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import * as fromArtist from './artist.reducer';

import { environment } from '../../../../environments/environment';

export interface State {
  artists: fromArtist.State;
}

export const reducers: ActionReducerMap<State> = {
  artists: fromArtist.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
