import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ArtistFollowedPaging } from '../models/artist.model';
import { SpotifyCursor } from '../models/spotify-common-objects';

@Injectable({ providedIn: 'root' })
export class ArtistService {

  constructor(private httpClient: HttpClient) {}

  getAllFollowed(cursors?: SpotifyCursor): Observable<ArtistFollowedPaging> {
    const cursorsParam = cursors ?? {};

    return this.httpClient
      .get<ArtistFollowedPaging>(
        environment.spotifyApiUrl + 'me/following',
        {
          params: {
            ...cursorsParam,
            type: 'artist'
          }
        }
      );
  }
}
