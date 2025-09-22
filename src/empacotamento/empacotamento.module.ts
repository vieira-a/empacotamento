import { Module } from '@nestjs/common';
import { PedidoController } from './api/http/rest/controllers/pedido.controller';
import { EmbalagemService } from './domain/services/embalage.service';
import { EmpacotarPedidoUseCase } from './application/use-cases/empacotar-pedido.usecase';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PedidoController],
  providers: [EmbalagemService, EmpacotarPedidoUseCase],
})
export class EmpacotamentoModule {}
