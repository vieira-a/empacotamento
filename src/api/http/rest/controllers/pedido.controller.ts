import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { EmpacotarPedidosDTO } from '../../../../application/dtos/empacotar-pedido.dto';
import { EmpacotarPedidoUseCase } from '../../../../application/use-cases/empacotar-pedido.usecase';
import { JwtMicroserviceGuard } from '../../../../auth/jwt.guard';
import { EmpacotarPedidosResponseDTO } from '../dtos/empacotar-pedido-response.dto';

@Controller('pedidos')
@ApiTags('Pedidos')
export class PedidoController {
  private readonly empacotarPedidoUseCase = new EmpacotarPedidoUseCase();

  @UseGuards(JwtMicroserviceGuard)
  @Post('empacotar')
  @ApiOkResponse({ type: EmpacotarPedidosResponseDTO })
  @ApiOperation({ summary: 'Empacota os pedidos informados' })
  @ApiResponse({ status: 201, description: 'Pedidos empacotados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiBody({ type: EmpacotarPedidosDTO })
  empacotar(@Body() body: EmpacotarPedidosDTO): EmpacotarPedidosResponseDTO {
    const resultados = body.pedidos.map((pedidoDTO) =>
      this.empacotarPedidoUseCase.execute(pedidoDTO),
    );

    return { pedidos: resultados };
  }
}
