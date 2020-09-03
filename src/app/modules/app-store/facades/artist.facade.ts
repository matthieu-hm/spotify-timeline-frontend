import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromArtistActions from '../actions/artist.actions';
import * as fromArtistReducers from '../reducers/artist.reducer';

@Injectable()
export class ArtistFacade {
  ids$ = this.store.pipe(select(fromArtistReducers.selectIds));
  entities$ = this.store.pipe(select(fromArtistReducers.selectEntities));
  all$ = this.store.pipe(select(fromArtistReducers.selectAll));
  totalLoaded$ = this.store.pipe(select(fromArtistReducers.selectTotalLoaded));
  total$ = this.store.pipe(select(fromArtistReducers.selectTotal));
  cursors$ = this.store.pipe(select(fromArtistReducers.selectCursors));

  constructor(private store: Store<fromArtistReducers.State>) {}

  public queryAllFollowed(): void {
    this.store.dispatch(fromArtistActions.queryAllFollowed());
  }
}
