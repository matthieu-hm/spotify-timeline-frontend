import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { LoginButtonComponent } from './login-button/login-button.component';

@NgModule({
  declarations: [LoginButtonComponent],
  exports: [LoginButtonComponent],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
