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
  UploadedFile,
} from '@nestjs/common';
import { OrderEventsService } from './order-events.service';
import { CreateOrderEventDto } from './dto/create-order-event.dto';
import { UpdateOrderEventDto } from './dto/update-order-event.dto';
import { FindOneOrderEventDto } from './dto/find-one-order-event.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/common/services/s3.service';
import { FilesOrderEventDto } from './dto/files-order-event.dto';
import { fileFilter } from './helpers/fileFilter.helper';
import { isBase64 } from 'class-validator';
import { Test } from '@nestjs/testing';

@ApiTags('OrdersEvents')
@Controller('order-events')
export class OrderEventsController {
  constructor(
    private readonly orderEventsService: OrderEventsService,
    private readonly s3: S3Service,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Crear Evento del Pedido' })
  create(
    @Body() body: CreateOrderEventDto,
  ) {
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


  public regex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,([a-zA-Z0-9/+=]+)$/;
  public maxSize = 10 * 1024 * 1024;

  validateImage(image: string, fieldName: string) {
    if (!image) {
      throw new NotFoundException(`File '${fieldName}' is required`);
    }
    if (!image.match(/\.(JPG|JPEG|PNG|jpg|jpeg|png)$/)) {
      if (!image.match(this.regex)) {
        throw new UnprocessableEntityException(
          `Only image files are allowed for '${fieldName}': JPG|JPEG|PNG|jpg|jpeg|png`,
        );
      }
      const buffer = Buffer.from(image, 'base64');
      if (buffer.length > this.maxSize) {
        throw new PayloadTooLargeException(
          `The '${fieldName}' file exceeds the maximum size allowed: 10MB`,
        );
      }
    }
  };

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { file: file.buffer.toString('base64') }
  }

}
