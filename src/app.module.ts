import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmpacotamentoModule } from './empacotamento/empacotamento.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    EmpacotamentoModule,
  ],
})
export class AppModule {}
