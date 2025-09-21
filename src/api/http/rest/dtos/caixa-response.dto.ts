import { ApiProperty } from '@nestjs/swagger';

export class CaixaResponseDTO {
  @ApiProperty({ example: 'caixa-1', nullable: true })
  caixa_id: string | null;

  @ApiProperty({ type: [String], example: ['produto-1', 'produto-2'] })
  produtos: string[];

  @ApiProperty({
    required: false,
    example: 'Produto não cabe em nenhuma caixa disponível.',
  })
  observacao?: string;
}
