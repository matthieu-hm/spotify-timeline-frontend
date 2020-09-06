export interface AppTokens {
  access: string | null;
  refresh: string | null;
}

export interface AppRefreshTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}
