import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ArtistFacade } from '../app-store/facades/artist.facade';
import { Artist } from '../app-store/models/artist.model';

@Component({
  selector: 'app-route-artists',
  templateUrl: './route-artists.component.html',
  styleUrls: ['./route-artists.component.scss']
})
export class RouteArtistsComponent implements OnInit {

  public all$: Observable<Artist[]>;
  public totalLoaded$: Observable<number>;
  public total$: Observable<number>;

  constructor(private artistFacade: ArtistFacade) {
    this.all$ = this.artistFacade.all$;
    this.totalLoaded$ = this.artistFacade.totalLoaded$;
    this.total$ = this.artistFacade.total$;
  }


  ngOnInit() {
    this.artistFacade.queryAllFollowed();
  }

  onClick() {
    this.artistFacade.queryMoreAllFollowed();
  }
}
