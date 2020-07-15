import { TestBed } from '@angular/core/testing';

import { WindowPopupService } from './window-popup.service';

describe('WindowPopupService', () => {
  let service: WindowPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
