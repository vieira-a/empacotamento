import { ApiProperty } from '@nestjs/swagger';
import { PedidoResponseDTO } from './pedido-response.dto';

export class EmpacotarPedidosResponseDTO {
  @ApiProperty({ type: [PedidoResponseDTO] })
  pedidos: PedidoResponseDTO[];
}
