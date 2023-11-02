import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

export class CreateOrderEventDto {
  @ApiProperty({ type: String, example: 'Observaciones del Pedido' })
  @IsString()
  observations: string;

  @ApiProperty({ type: String, example: 'https://www.my-image.blobstorage.com' })
  @IsString()
  mainImageUrl: string;

  @ApiProperty({ type: String, example: 'https://www.my-image.blobstorage.com' })
  @IsString()
  referenceImageUrl: string;

  @ApiProperty({ type: String, example: '45.665443' })
  @IsString()
  longitude: string;

  @ApiProperty({ type: String, example: '-47.665443' })
  @IsString()
  latitude: string;

  @ApiProperty({ type: String, nullable: true, required: false, example: '99999999' })
  @IsString()
  orderId?: string;

  @ApiProperty({ type: CreateOrderDto, nullable: true, required: false })
  @IsObject()
  @IsOptional()
  order?: CreateOrderDto;

  @ApiProperty({ type: Number, example: 4 })
  @IsNumber()
  eventId: number;

  @ApiProperty({ type: String, example: 'uuid' })
  @IsString()
  @IsOptional()
  userId?: string;
}
