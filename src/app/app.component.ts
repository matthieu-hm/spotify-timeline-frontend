import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthFacade } from './modules/app-store/facades/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isAuthenticated$: Observable<boolean>;

  constructor(private authFacade: AuthFacade) {
    this.isAuthenticated$ = this.authFacade.isAuthenticated$;
  }
}
