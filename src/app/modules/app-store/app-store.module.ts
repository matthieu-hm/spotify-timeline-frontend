import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../../environments/environment';

import { reducers, metaReducers } from './reducers';
import { ArtistEffects } from './effects/artist.effects';
import { ArtistService } from './services/artist.service';
import { ArtistFacade } from './facades/artist.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
      }
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      ArtistEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    ArtistService,
    ArtistFacade,
  ]
})
export class AppStoreModule { }
