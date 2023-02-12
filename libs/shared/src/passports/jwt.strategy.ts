import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      iss: payload.iss,
      exp: payload.exp,
      aud: payload.aud,
      client_id: payload.client_id,
      jti: payload.jti,
      iat: payload.iat,
      sub: payload.sub,
      scope: payload.scope,
    };
  }
}
