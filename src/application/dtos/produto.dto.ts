import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DimensoesDTO {
  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(1)
  altura: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(1)
  largura: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(1)
  comprimento: number;
}

export class ProdutoDTO {
  @ApiProperty({ example: 'produto-123' })
  @IsString()
  produto_id: string;

  @ApiProperty({ type: DimensoesDTO })
  @ValidateNested()
  @Type(() => DimensoesDTO)
  dimensoes: DimensoesDTO;
}
