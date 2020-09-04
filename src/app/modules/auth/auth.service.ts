import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { CurrentUser } from '../app-store/models/current-user.model';

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

  public refreshToken(): Observable<unknown> {
    const refreshToken = this.cookieService.get('refresh_token');

    // TODO: Error if try to refresh without refresh_token

    return this.httpClient.get(
      environment.appApiUrl + 'spotify-api/refresh-token',
      {
        params: {
          refresh_token: refreshToken,
        }
      }
    );
  }
}
