import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AuthFacade } from '../app-store/facades/auth.facade';

import { AuthService } from './auth.service';
import { SpotifyTokensInterceptor } from './spotify-tokens.interceptor';
import { authInitializer } from './auth.initializer';
import { LogoutButtonComponent } from './logout-button/logout-button.component';

@NgModule({
  declarations: [
    LogoutButtonComponent
  ],
  exports: [
    LogoutButtonComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpotifyTokensInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: authInitializer,
      multi: true,
      deps: [
        AuthFacade,
        CookieService,
      ]
    },
  ]
})
export class AuthModule { }
