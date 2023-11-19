import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  NotFoundException,
  UnprocessableEntityException,
  UploadedFiles,
  UseInterceptors,
  PayloadTooLargeException,
} from '@nestjs/common';
import { OrderEventsService } from './order-events.service';
import { CreateOrderEventDto } from './dto/create-order-event.dto';
import { UpdateOrderEventDto } from './dto/update-order-event.dto';
import { FindOneOrderEventDto } from './dto/find-one-order-event.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
} from '@nestjs/platform-express';

@ApiTags('OrdersEvents')
@Controller('order-events')
export class OrderEventsController {
  constructor(
    private readonly orderEventsService: OrderEventsService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Crear Evento del Pedido' })
  create(@Body() body: CreateOrderEventDto) {
    return this.orderEventsService.create(body);
  }

  @Get('getAll/:userId')
  @ApiOperation({
    summary: 'Obtener Todos los Eventos del Pedido por el Usuario',
  })
  findAll(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.orderEventsService.findAll(userId);
  }

  @Get('getOne')
  @ApiOperation({
    summary: 'Obtener Evento del Pedido por ID/orden_id,evento_id',
  })
  findOne(@Query() query: FindOneOrderEventDto) {
    return this.orderEventsService.findOne(query);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar Pedido' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderEventDto: UpdateOrderEventDto,
  ) {
    return this.orderEventsService.update(id, updateOrderEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Pedido' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderEventsService.remove(id);
  }

  @Post('upload/:orderEventId')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mainImage', maxCount: 1 },
      { name: 'referenceImage', maxCount: 1 },
    ]),
  )

  @ApiOperation({ summary: 'Guarda la photo de cargo y referencial en el blob s3 y actualiza el pedido con las url' })
  uploadFiles(
    @UploadedFiles() files: { mainImage: Express.Multer.File[], referenceImage: Express.Multer.File[] },
    @Param('orderEventId') orderEventId: string
  ) {
    const allowedTypes = /^image\/(jpeg|jpg|png|gif)$/;
    const maxSize = 10 * 1024 * 1024;
    try {
      this.validateFile(files.mainImage, allowedTypes, maxSize, 'mainImage');
      this.validateFile(files.referenceImage, allowedTypes, maxSize, 'referenceImage');
      return this.orderEventsService.uploadFiles(files, orderEventId);
    } catch (error) {
      throw error;
    }

  }
  validateFile(file: Express.Multer.File[], allowedTypes: RegExp, maxSize: number, fileType: string) {
    try {
      if (!file) {
        throw new NotFoundException(`File '${fileType}' is required`);
      }
      if (!file[0].mimetype.match(allowedTypes)) {
        throw new UnprocessableEntityException(
          `Only image files are allowed for '${fileType}': jpg|jpeg|png`,
        );
      }
      if (file[0].size > maxSize) {
        throw new PayloadTooLargeException(
          `The '${fileType}' file exceeds the maximum size allowed: 10MB`,
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
