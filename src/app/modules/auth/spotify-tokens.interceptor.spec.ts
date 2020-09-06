import { TestBed } from '@angular/core/testing';

import { SpotifyTokensInterceptor } from './spotify-tokens.interceptor';

describe('SpotifyTokensInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SpotifyTokensInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SpotifyTokensInterceptor = TestBed.inject(SpotifyTokensInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
