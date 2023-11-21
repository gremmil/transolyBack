import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateOrderEventDto {
  @ApiProperty({ type: String, example: 'Observaciones del Pedido' })
  @IsString()
  @IsOptional()
  observations?: string;

  @ApiProperty({ type: String, example: '45.665443' })
  @IsString()
  @IsOptional()
  longitude?: string;

  @ApiProperty({ type: String, example: '-47.665443' })
  @IsString()
  @IsOptional()
  latitude?: string;

  @ApiProperty({ example: 'https://www.my-image.blobstorage.com' })
  @IsString()
  @IsOptional()
  mainImageUrl?: string;

  @ApiProperty({ example: 'https://www.my-image.blobstorage.com' })
  @IsString()
  @IsOptional()
  referenceImageUrl?: string;

  @ApiProperty({ type: String, nullable: true, required: false, example: '99999999' })
  @IsUUID()
  orderId: string;

  @ApiProperty({ type: Number, example: 4 })
  @IsNumber()
  eventId: number;

  @ApiProperty({ type: String, example: 'uuid' })
  @IsUUID()
  @IsOptional()
  userId?: string;
}
