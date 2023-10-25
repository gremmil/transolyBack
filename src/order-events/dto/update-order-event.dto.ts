import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderEventDto } from './create-order-event.dto';

export class UpdateOrderEventDto extends PartialType(CreateOrderEventDto) {}
