import { ApiProperty } from '@nestjs/swagger';
import { PedidoDTO } from './pedido.dto';

export class EmpacotarPedidosDTO {
  @ApiProperty({ type: [EmpacotarPedidosDTO] })
  pedidos: PedidoDTO[];
}
