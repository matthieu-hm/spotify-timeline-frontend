import { Component, OnInit } from '@angular/core';
import { WindowPopupService } from '../../../services/window-popup.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(
    private windowPopupService: WindowPopupService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onClick(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.refreshToken().subscribe(response => {
        console.log(response);
      });
    } else {
      this.windowPopupService.open('http://localhost:8010/spotify-api/login', null, null, () => {
        console.log('closed !');
      });
    }
  }

}
