import { ApiProperty } from '@nestjs/swagger';
import { PedidoDTO } from './pedido.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EmpacotarPedidosDTO {
  @ApiProperty({ type: [PedidoDTO] })
  @ValidateNested({ each: true })
  @Type(() => PedidoDTO)
  pedidos: PedidoDTO[];
}
