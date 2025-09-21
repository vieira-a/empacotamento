import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  EmpacotarPedidoUseCase,
  PedidoDTO,
} from 'src/application/use-cases/empacotar-pedido.usecase';

export type EmpacotarPedidosDTO = { pedidos: PedidoDTO[] };

@Controller('pedidos')
@ApiTags('Pedidos')
export class PedidoController {
  private readonly empacotarPedidoUseCase = new EmpacotarPedidoUseCase();

  @Post('empacotar')
  @ApiOperation({ summary: 'Empacota os pedidos informados' })
  @ApiResponse({ status: 201, description: 'Pedidos empacotados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiBody({ type: Object })
  empacotar(@Body() body: EmpacotarPedidosDTO) {
    const resultados = body.pedidos.map((pedidoDTO) =>
      this.empacotarPedidoUseCase.execute(pedidoDTO),
    );

    return { pedidos: resultados };
  }
}
