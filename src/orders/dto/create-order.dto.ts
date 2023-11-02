import { ApiProperty, ApiHeader } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { CreateOrderEventDto } from 'src/order-events/dto/create-order-event.dto';

export class CreateOrderDto {

  @ApiProperty({ type: String, description: 'Número de orden' })
  @IsString()
  orderNumber: string;

  @ApiProperty({ type: Number, description: 'Compañía asociada a la orden' })
  @IsNumber()
  companyId: number;

  @ApiProperty({ type: Number, example: 10, description: 'Cantidad de piezas', default: 0 })
  @IsNumber()
  pieces: number;

  @ApiProperty({ type: String, example: 'ABC123', description: 'Código del consultor' })
  @IsString()
  consultantCode: string;

  @ApiProperty({ type: String, example: 'John Doe', description: 'Nombre del consultor' })
  @IsString()
  consultantName: string;

  @ApiProperty({ type: String, example: '1234567890', description: 'Teléfono del consultor' })
  @IsString()
  consultantPhone: string;

  @ApiProperty({ type: String, example: '123 Main St', description: 'Dirección' })
  @IsString()
  address: string;

  @ApiProperty({ type: String, example: '40.7128', description: 'Latitud' })
  @IsString()
  latitude: string;

  @ApiProperty({ type: String, example: '-74.0060', description: 'Longitud' })
  @IsString()
  longitude: string;

  @ApiProperty({ type: Array<CreateOrderEventDto>, description: 'Eventos de la orden' })
  @IsArray()
  orderevents: Array<CreateOrderEventDto>;

}

