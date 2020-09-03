import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { ArtistService } from '../services/artist.service';
import * as artistActions from '../actions/artist.actions';



@Injectable()
export class ArtistEffects {

  queryAllFollowed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(artistActions.queryAllFollowed),
      exhaustMap(action =>
        this.artistService.getAllFollowed().pipe(
          map(artistsResponse => artistActions.queryAllFollowedSuccess(artistsResponse)),
          catchError(error => of(artistActions.queryAllFollowedError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private artistService: ArtistService,
  ) {}

}
