import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';
import { LoginButtonComponent } from './login-button/login-button.component';

@NgModule({
  declarations: [LoginButtonComponent],
  exports: [LoginButtonComponent],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }
