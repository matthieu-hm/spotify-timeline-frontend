import { Component, OnInit } from '@angular/core';
import { State } from '../app-store/reducers';
import { Store } from '@ngrx/store';
import * as artistActions from '../app-store/actions/artist.actions';

@Component({
  selector: 'app-route-artists',
  templateUrl: './route-artists.component.html',
  styleUrls: ['./route-artists.component.scss']
})
export class RouteArtistsComponent implements OnInit {

  constructor(private store: Store<State>) { }


  ngOnInit() {
    this.getFollowedArtists();
  }

  getFollowedArtists() {
    this.store.dispatch(artistActions.queryAllFollowed());
  }

}
