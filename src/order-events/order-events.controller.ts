import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { OrderEventsService } from './order-events.service';
import { CreateOrderEventDto } from './dto/create-order-event.dto';
import { UpdateOrderEventDto } from './dto/update-order-event.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FindOneOrderEventDto } from './dto/find-one-order-event.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('OrdersEvents')
@Controller('order-events')
export class OrderEventsController {
  constructor(private readonly orderEventsService: OrderEventsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear Evento del Pedido' })
  create(@Body() createOrderEventDto: CreateOrderEventDto) {
    return this.orderEventsService.create(createOrderEventDto);
  }

  @Get('getAll/:userId')
  @ApiOperation({ summary: 'Obtener Todos los Eventos del Pedido por el Usuario' })
  findAll(@Param('userId', ParseUUIDPipe) userId: string,) {
    return this.orderEventsService.findAll(userId);
  }

  @Get('getOne')
  @ApiOperation({ summary: 'Obtener Evento del Pedido por ID/orden_id,evento_id' })
  findOne(@Query() query: FindOneOrderEventDto) {
    return this.orderEventsService.findOne(query);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar Pedido' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderEventDto: UpdateOrderEventDto) {
    return this.orderEventsService.update(id, updateOrderEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Pedido' })
  remove(@Param('id', ParseUUIDPipe) id: string,) {
    return this.orderEventsService.remove(id);
  }
}
