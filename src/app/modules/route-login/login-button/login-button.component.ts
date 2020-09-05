import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '../../app-store/facades/auth.facade';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent {

  public isLoginPending$: Observable<boolean>;

  constructor(
    private authFacade: AuthFacade,
  ) {
    this.isLoginPending$ = this.authFacade.isLoginPending$;
  }

  onClick(): void {
    this.authFacade.login();
  }

}
