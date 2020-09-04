import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, take, switchMap } from 'rxjs/operators';

import * as artistActions from '../actions/artist.actions';
import { ArtistFacade } from '../facades/artist.facade';
import { ArtistService } from '../services/artist.service';



@Injectable()
export class ArtistEffects {

  queryAllFollowed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(artistActions.queryAllFollowed),
      switchMap(() =>
        this.artistFacade.cursors$.pipe(take(1))
      ),
      switchMap(cursors =>
        this.artistService
          .getAllFollowed(cursors)
          .pipe(
            map(artistsResponse => artistActions.queryAllFollowedSuccess(artistsResponse)),
            catchError(error => of(artistActions.queryAllFollowedError({ error })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private artistFacade: ArtistFacade,
    private artistService: ArtistService,
  ) {}

}
