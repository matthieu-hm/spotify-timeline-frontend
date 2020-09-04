import { CookieService } from 'ngx-cookie-service';

import { AuthFacade } from '../app-store/facades/auth.facade';

export function authInitializer(authFacade: AuthFacade, cookieService: CookieService): () => Promise<void> {
  return (): Promise<void> => {
    const tokens = {
      access: cookieService.get('access_token'),
      refresh: cookieService.get('refresh_token'),
    };

    authFacade.init(tokens);

    return Promise.resolve();
  };
}
