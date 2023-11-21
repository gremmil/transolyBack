import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderEventDto } from './dto/create-order-event.dto';
import { UpdateOrderEventDto } from './dto/update-order-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { MastersService } from 'src/masters/masters.service';
import { Order } from 'src/orders/entities/order.entity';
import { FindOneOrderEventDto } from './dto/find-one-order-event.dto';
import { User } from 'src/users/entities/user.entity';
import { S3Service } from 'src/common/services/s3.service';
import { isBase64 } from 'class-validator';
import { base64ToBlob } from './helpers/fileConverter.helper';
import { Event } from 'src/masters/entities/event.entity';
import { Company } from 'src/masters/entities/company.entity';
import { BodyFilesOrderEventDto, FilesOrderEventDto } from './dto/files-order-event.dto';
import { OrderEvent } from './entities/order-event.entity';

@Injectable()
export class OrderEventsService {
  private findOptions: FindOneOptions<OrderEvent> = {
    relations: {
      event: true,
      order: true,
      user: true,
    },
    select: {
      event: {
        id: true,
        description: true,
      },
      order: {
        id: true,
      },
      user: {
        id: true,
        userName: true,
      },
    },
    loadEagerRelations: false,
  };
  constructor(
    @InjectRepository(OrderEvent)
    private readonly orderEventRepository: Repository<OrderEvent>,
    private readonly dataSource: DataSource,
    private readonly mastersService: MastersService,
    private readonly s3: S3Service,
  ) { }

  async create(dto: CreateOrderEventDto) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { eventId, userId, orderId, ...detailsOrderEvent } = dto;
      const isOrderFinished: OrderEvent =
        await this.orderEventRepository.findOne({
          where: { order: { id: orderId }, event: { id: 3 } },
        });
      if (isOrderFinished) {
        throw new BadRequestException('The order is already finalized.');
      } else {
        let itemCreated = this.orderEventRepository.create({
          ...detailsOrderEvent,
          event: await queryRunner.manager
            .getRepository(Event)
            .findOne({
              where: { id: eventId },
              select: { id: true, description: true },
              loadEagerRelations: false,
            }),
          order: { id: orderId },
        });

        if (userId) {
          itemCreated.user = await queryRunner.manager.getRepository(User).findOne({
            where: { id: userId },
            select: { id: true, userName: true },
            loadEagerRelations: false,
          });
        }
        const itemSaved = await this.orderEventRepository.save(itemCreated);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return itemSaved;
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async update(id: string, dto: UpdateOrderEventDto) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { eventId, userId, orderId, ...detailsOrderEvent } = dto;
      const existingOrderEvent = await this.findOne({ id });
      let itemUpdated = this.orderEventRepository.merge(
        existingOrderEvent,
        detailsOrderEvent,
      );
      if (eventId) {
        itemUpdated.event = await queryRunner.manager
          .getRepository(Event)
          .findOne({
            where: { id: eventId },
            select: { id: true, description: true },
            loadEagerRelations: false,
          })
      }
      if (userId) {
        itemUpdated.user = await queryRunner.manager
          .getRepository(User)
          .findOne({
            where: { id: userId },
            select: { id: true, userName: true },
          });
      }
      const itemSaved = await this.orderEventRepository.save(itemUpdated);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return itemSaved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async findAll(userId: string) {
    try {
      const orderEventList = await this.orderEventRepository.find({
        where: { user: { id: userId } },
        ...this.findOptions,
      });
      return orderEventList;
    } catch (error) {
      throw error;
    }
  }

  async findOne(dto: FindOneOrderEventDto) {
    try {
      const { id, eventId, orderId } = dto;
      let orderEvent: OrderEvent;

      if (id) {
        orderEvent = await this.orderEventRepository.findOne({
          where: { id },
          ...this.findOptions,
        });
        if (!orderEvent) {
          throw new NotFoundException(
            'No order event was found with the given ID.',
          );
        }
      } else {
        orderEvent = await this.orderEventRepository.findOne({
          where: { event: { id: eventId }, order: { id: orderId } },
          ...this.findOptions,
        });
        if (!orderEvent) {
          throw new NotFoundException(
            'No order event was found with the given eventId and/or orderId.',
          );
        }
      }

      return orderEvent;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const product = await this.findOne({ id });
    await this.orderEventRepository.remove(product);
  }

  async uploadFiles(files: FilesOrderEventDto, orderEventId: string) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { mainImage, referenceImage } = files;
      const orderEvent = await queryRunner.manager
        .getRepository(OrderEvent)
        .findOne({
          where: { id: orderEventId },
          relations: { order: { company: true, orderevents: false }, event: true, },
          select: { order: { orderNumber: true, company: { container: true }, orderevents: false } },
        });
      const { company, orderNumber, id: orderId } = orderEvent.order;
      const { id: eventId } = orderEvent.event;
      const { container } = company;
      const folder = container || 'contenedor-error';
      let filesToUpload = {};
      const mainImageKey = `${folder}/${orderNumber || orderId
        }/event_${eventId || 0}/mainImage`;
      const referenceImageKey = `${folder}/${orderNumber || orderId
        }/event_${eventId || 0}/referenceImage`;
      filesToUpload[mainImageKey] = new Blob([mainImage[0].buffer], { type: mainImage[0].mimetype });
      filesToUpload[referenceImageKey] = new Blob([referenceImage[0].buffer], { type: referenceImage[0].mimetype });
      const locations = await this.s3.uploadFiles(filesToUpload);
      orderEvent.mainImageURL = locations[mainImageKey];
      orderEvent.referenceImageURL = locations[referenceImageKey];
      await queryRunner.commitTransaction();
      await queryRunner.release();
      const { observations, mainImageURL, referenceImageURL, longitude, latitude, user } = orderEvent;
      const itemUpdated: UpdateOrderEventDto = {
        observations,
        mainImageURL,
        referenceImageURL,
        longitude,
        latitude,
        eventId,
        orderId,
      }
      const itemSaved = await this.update(orderEventId, itemUpdated);
      return itemSaved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }

  }
}
