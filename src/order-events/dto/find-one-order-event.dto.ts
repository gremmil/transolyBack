import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

export class FindOneOrderEventDto {
  @ApiPropertyOptional({ type: String })
  @ValidateIf((dto) => !dto.orderId && !dto.eventId)
  @IsUUID()
  id?: string;

  @ApiPropertyOptional({ type: String })
  @ValidateIf((dto) => !dto.id)
  @IsNotEmpty()
  orderId?: string;

  @ApiPropertyOptional({ type: Number })
  @ValidateIf((dto) => !dto.id)
  @IsNotEmpty()
  eventId?: number;
}
