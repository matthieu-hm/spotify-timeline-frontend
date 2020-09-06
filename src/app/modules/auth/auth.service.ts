import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { CurrentUser } from '../app-store/models/current-user.model';
import { AppRefreshTokenResponse } from '../app-store/models/app-common-objects';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
  ) {}

  public getCurrentUser(): Observable<{ currentUser: CurrentUser }> {
    return this.httpClient
      .get<CurrentUser>(environment.spotifyApiUrl + 'me')
      .pipe(
        map(response => {
          return { currentUser: response };
        })
      );
  }

  public refreshToken(): Observable<AppRefreshTokenResponse> {
    const refreshToken = this.cookieService.get('refresh_token');

    if (!refreshToken) {
      throwError('No refresh token');
    }

    return this.httpClient.get<AppRefreshTokenResponse>(
      environment.appApiUrl + 'spotify-api/refresh-token',
      {
        params: {
          refresh_token: refreshToken,
        }
      }
    );
  }
}
