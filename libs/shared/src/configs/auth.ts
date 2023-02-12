import { registerAs } from '@nestjs/config';
enum ALGO {
  HS256 = 'HS256',
  HS384 = 'HS384',
  HS512 = 'HS512',
  RS256 = 'RS256',
  RS384 = 'RS384',
  RS512 = 'RS512',
  ES256 = 'ES256',
  ES384 = 'ES384',
  ES512 = 'ES512',
  none = 'none',
}

export const configAuth = registerAs('auth', () => ({
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
    callback: process.env.GOOGLE_CALLBACK,
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      lifetime: 2000000,
      algorithm: ALGO.HS256,
    },
    reset_password_secret: process.env.RESET_PASSWORD_SECRET,
    refresh_token_lifetime: 2000000,
    access_token_lifetime: 2000000,
  },
}));
