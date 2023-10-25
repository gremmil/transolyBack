import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderEventsService } from './order-events.service';
import { CreateOrderEventDto } from './dto/create-order-event.dto';
import { UpdateOrderEventDto } from './dto/update-order-event.dto';

@Controller('order-events')
export class OrderEventsController {
  constructor(private readonly orderEventsService: OrderEventsService) {}

  @Post()
  create(@Body() createOrderEventDto: CreateOrderEventDto) {
    return this.orderEventsService.create(createOrderEventDto);
  }

  @Get()
  findAll() {
    return this.orderEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderEventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderEventDto: UpdateOrderEventDto) {
    return this.orderEventsService.update(+id, updateOrderEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderEventsService.remove(+id);
  }
}
