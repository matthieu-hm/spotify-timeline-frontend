import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppCommonModule } from './modules/app-common/app-common.module';
import { AppStoreModule } from './modules/app-store/app-store.module';
import { AuthModule } from './modules/auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowPopupService } from './services/window-popup.service';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppCommonModule.forRoot(),
    AppStoreModule,
    AuthModule,
  ],
  providers: [
    CookieService,
    WindowPopupService,
    AuthGuard,
    NotAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
