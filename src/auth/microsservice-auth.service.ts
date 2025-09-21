import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MicroserviceAuthService {
  constructor(private readonly jwtService: JwtService) {}

  gerarToken(serviceId: string): string {
    return this.jwtService.sign({ serviceId });
  }
}
