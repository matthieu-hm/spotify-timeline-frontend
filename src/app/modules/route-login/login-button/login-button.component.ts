import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '../../app-store/facades/auth.facade';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent {

  public loginIsInProgress$: Observable<boolean>;

  constructor(
    private authfacade: AuthFacade,
  ) {
    this.loginIsInProgress$ = this.authfacade.loginIsInProgress$;
  }

  onClick(): void {
    this.authfacade.openAuthModal();
  }

}
