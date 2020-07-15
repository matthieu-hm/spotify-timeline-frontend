import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotify-timeline';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public onClick(): void {
    this.httpClient
      .get('https://api.spotify.com/v1/me/following', {
        params: {
          type: 'artist'
        }
      })
      .subscribe(response => {
        console.log(response);
      })
    ;

    return;
  }

}
