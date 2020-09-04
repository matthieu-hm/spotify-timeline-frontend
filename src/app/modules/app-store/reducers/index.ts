import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import * as fromArtist from './artist.reducer';
import * as fromAuth from './auth.reducer';

import { environment } from '../../../../environments/environment';

export interface State {
  artists: fromArtist.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  artists: fromArtist.reducer,
  auth: fromAuth.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
