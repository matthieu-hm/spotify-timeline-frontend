import { Component } from '@angular/core';
import { AuthFacade } from '../../app-store/facades/auth.facade';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {

  constructor(
    private authFacade: AuthFacade,
  ) {}

  onClick(): void {
    this.authFacade.logout();
  }

}
