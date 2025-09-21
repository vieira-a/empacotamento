import { Module } from '@nestjs/common';
import { PedidoController } from './api/http/rest/controllers/pedido.controller';
import { EmbalagemService } from './domain/services/embalage.service';
import { EmpacotarPedidoUseCase } from './application/use-cases/empacotar-pedido.usecase';

@Module({
  imports: [],
  controllers: [PedidoController],
  providers: [EmbalagemService, EmpacotarPedidoUseCase],
})
export class EmpacotamentoModule {}
