import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-ms-empacotamento',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('MICROSERVICE_JWT_SECRET')!,
    });
  }

  validate(payload: { serviceId: string }) {
    return { serviceId: payload.serviceId };
  }
}
