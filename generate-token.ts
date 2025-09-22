#!/usr/bin/env ts-node

import { NestFactory } from '@nestjs/core';
import { MicroserviceAuthService } from './src/auth/microsservice-auth.service';
import { AppModule } from './src/app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const authService = app.get(MicroserviceAuthService);

  const serviceId = process.argv[2];
  if (!serviceId) {
    console.error('Use: ts-node generate-token.ts <serviceId>');
    process.exit(1);
  }

  const token = authService.gerarToken(serviceId);
  console.log(token);

  await app.close();
}

void bootstrap();
