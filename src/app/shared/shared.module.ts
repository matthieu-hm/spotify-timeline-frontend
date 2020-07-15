import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WindowPopupService } from './services/window-popup.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    WindowPopupService,
  ]
})
export class SharedModule { }
