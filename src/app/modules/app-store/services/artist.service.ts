import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ArtistFollowedResponse } from '../models/artist';

@Injectable({ providedIn: 'root' })
export class ArtistService {

  constructor(private httpClient: HttpClient) {}

  getAllFollowed(): Observable<ArtistFollowedResponse> {
    return this.httpClient
      .get<ArtistFollowedResponse>(
        'https://api.spotify.com/v1/me/following',
        {
          params: {
            type: 'artist'
          }
        }
      );
  }
}
