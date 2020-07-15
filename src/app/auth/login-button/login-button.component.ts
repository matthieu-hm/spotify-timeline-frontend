import { Component, OnInit } from '@angular/core';
import { WindowPopupService } from '../../shared/services/window-popup.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(private windowPopupService: WindowPopupService) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.windowPopupService.open('http://localhost:8010/spotify-api/login', null, null, () => {
      console.log('closed !');
    });
  }

}
