import { Injectable } from '@nestjs/common';
import { CreateOrderEventDto } from './dto/create-order-event.dto';
import { UpdateOrderEventDto } from './dto/update-order-event.dto';

@Injectable()
export class OrderEventsService {
  create(createOrderEventDto: CreateOrderEventDto) {
    return 'This action adds a new orderEvent';
  }

  findAll() {
    return `This action returns all orderEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderEvent`;
  }

  update(id: number, updateOrderEventDto: UpdateOrderEventDto) {
    return `This action updates a #${id} orderEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderEvent`;
  }
}
