import { Component, OnInit } from '@angular/core';

import { ArtistFacade } from '../app-store/facades/artist.facade';

@Component({
  selector: 'app-route-artists',
  templateUrl: './route-artists.component.html',
  styleUrls: ['./route-artists.component.scss']
})
export class RouteArtistsComponent implements OnInit {

  public all$;
  public totalLoaded$;
  public total$;

  constructor(private artistFacade: ArtistFacade) {
    this.all$ = this.artistFacade.all$;
    this.totalLoaded$ = this.artistFacade.totalLoaded$;
    this.total$ = this.artistFacade.total$;
  }


  ngOnInit() {
    this.artistFacade.queryAllFollowed();
  }
}
