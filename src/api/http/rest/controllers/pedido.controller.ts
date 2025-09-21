import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EmpacotarPedidosDTO } from 'src/application/dtos/empacotar-pedido.dto';
import { PedidoDTO } from 'src/application/dtos/pedido.dto';
import { EmpacotarPedidoUseCase } from 'src/application/use-cases/empacotar-pedido.usecase';
import { JwtMicroserviceGuard } from 'src/auth/jwt.guard';

@Controller('pedidos')
@ApiTags('Pedidos')
export class PedidoController {
  private readonly empacotarPedidoUseCase = new EmpacotarPedidoUseCase();

  @UseGuards(JwtMicroserviceGuard)
  @Post('empacotar')
  @ApiOperation({ summary: 'Empacota os pedidos informados' })
  @ApiResponse({ status: 201, description: 'Pedidos empacotados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiBody({ type: PedidoDTO })
  empacotar(@Body() body: EmpacotarPedidosDTO) {
    const resultados = body.pedidos.map((pedidoDTO) =>
      this.empacotarPedidoUseCase.execute(pedidoDTO),
    );

    return { pedidos: resultados };
  }
}
