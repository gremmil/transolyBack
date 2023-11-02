import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

export class FindOneOrderDto {
  @ApiPropertyOptional({ type: String, description: 'ID de orden' })
  @IsUUID()
  @ValidateIf((dto) => !dto.companyId && !dto.orderNumber)
  id?: string;

  @ApiPropertyOptional({ type: String, description: 'Número de orden' })
  @ValidateIf((dto) => !dto.id)
  @IsNotEmpty()
  orderNumber?: string;

  @ApiPropertyOptional({ type: Number, description: 'Compañía asociada a la orden' })
  @ValidateIf((dto) => !dto.id)
  @IsNotEmpty()
  companyId?: number;
}
