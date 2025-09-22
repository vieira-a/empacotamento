import { ApiProperty } from '@nestjs/swagger';
import { ProdutoDTO } from './produto.dto';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PedidoDTO {
  @ApiProperty({ type: [ProdutoDTO] })
  @ValidateNested({ each: true })
  @Type(() => ProdutoDTO)
  produtos: ProdutoDTO[];

  @ApiProperty()
  @IsString()
  pedido_id: string;
}
