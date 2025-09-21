import { ApiProperty } from '@nestjs/swagger';
import { CaixaResponseDTO } from './caixa-response.dto';

export class PedidoResponseDTO {
  @ApiProperty({ example: 'pedido-123' })
  pedido_id: string;

  @ApiProperty({ type: [CaixaResponseDTO] })
  caixas: CaixaResponseDTO[];
}
