import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsBase64Custom } from 'src/common/helpers/class-validators/base64-custom';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

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
  mainImageUrl: string;

  @ApiProperty({ example: 'https://www.my-image.blobstorage.com' })
  @IsString()
  referenceImageUrl: string;

  @ApiProperty({ type: String, nullable: true, required: false, example: '99999999' })
  @IsString()
  @IsUUID()
  orderId: string;

  @ApiProperty({ type: Number, example: 4 })
  @IsNumber()
  eventId: number;

  @ApiProperty({ type: String, example: 'uuid' })
  @IsString()
  @IsUUID()
  @IsOptional()
  userId?: string;
}
