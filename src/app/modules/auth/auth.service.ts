import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
  ) {}

  public isAuthenticated(): boolean {
    return !!this.cookieService.get('access_token');
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
