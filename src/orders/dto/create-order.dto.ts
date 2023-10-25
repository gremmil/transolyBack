import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderEventDto } from 'src/order-events/dto/create-order-event.dto';

export class CreateOrderDto {
  @ApiProperty({ example: 'Order number' })
  orderNumber: string;

  @ApiProperty({ example: 0, default: 0 })
  pieces: number;

  @ApiProperty({ example: 'Creation date of the order', nullable: true })
  creationDate: Date;

  @ApiProperty({ example: 'Update date of the order', nullable: true })
  updateDate: Date;

  @ApiProperty({ example: 'ID of the associated company' })
  companyId: string;

  @ApiProperty({ example: 'ID of the associated consultant' })
  consultantId: string;

  @ApiProperty({ type: [CreateOrderEventDto], isArray: true })
  orderEvents: Array<CreateOrderEventDto>;
}