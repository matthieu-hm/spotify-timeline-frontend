import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '../../app-store/facades/auth.facade';
import { CurrentUser } from '../../app-store/models/current-user.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.scss']
})
export class AppTopbarComponent {

  public currentUser$: Observable<CurrentUser>;

  constructor(private authFacade: AuthFacade) {
    this.currentUser$ = this.authFacade.currentUser$;
  }

  logout(): void {
    this.authFacade.logout();
  }

}
