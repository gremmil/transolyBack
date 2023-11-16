import { Controller, Get, Post, Body, Patch, Param, Delete, Query, } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindOneOrderDto } from './dto/find-one-order.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiOperation({ summary: 'Crear Pedido' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Obtener Pedidos' })
  @Get('getAll')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Obtener Pedido por id/numero_orden/empresa_id' })
  @Get('getOne')
  findOne(@Query() query: FindOneOrderDto) {
    return this.ordersService.findOne(query);
  }

  @ApiOperation({ summary: 'Actualizar Pedido' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Eliminar Pedido' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
