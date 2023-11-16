import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderEventDto } from './dto/create-order-event.dto';
import { UpdateOrderEventDto } from './dto/update-order-event.dto';
import { OrderEvent } from './entities/order-event.entity';
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
        const order = await queryRunner.manager
          .getRepository(Order)
          .findOne({
            where: { id: orderId },
            relations: { company: true },
            select: { id: true, orderNumber: true },
            loadEagerRelations: false,
          });

        let itemCreated = this.orderEventRepository.create({
          ...detailsOrderEvent,
          event: await queryRunner.manager
            .getRepository(Event)
            .findOne({
              where: { id: eventId },
              select: { id: true, description: true },
              loadEagerRelations: false,
            }),
          order: { id: order.id },
        });

        if (userId) {
          itemCreated.user = await queryRunner.manager.getRepository(User).findOne({
            where: { id: userId },
            select: { id: true, userName: true },
            loadEagerRelations: false,
          });
        }
        const { mainImageUrl, referenceImageUrl } = dto;
        if (mainImageUrl || referenceImageUrl) {
          const order = await queryRunner.manager
            .getRepository(Order)
            .findOne({
              where: { id: orderId },
              relations: { company: true },
              select: { id: true, orderNumber: true },
              loadEagerRelations: false,
            });

          const company = await queryRunner.manager
            .getRepository(Company)
            .findOne({
              where: { id: order.company.id },
              select: { id: true, description: true, container: true },
              loadEagerRelations: false,
            });

          itemCreated.mainImageUrl = await this.handlerFilesToUpload(
            mainImageUrl,
            eventId,
            order,
            'mainPhoto',
            company
          );
          itemCreated.referenceImageUrl = await this.handlerFilesToUpload(
            referenceImageUrl,
            eventId,
            order,
            'refPhoto',
            company
          );
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
      const { mainImageUrl, referenceImageUrl } = dto;
      if (mainImageUrl || referenceImageUrl) {
        const order = await queryRunner.manager
          .getRepository(Order)
          .findOne({
            where: { id: orderId },
            relations: { company: true },
            select: { id: true, orderNumber: true },
            loadEagerRelations: false,
          });
        const company = await queryRunner.manager
          .getRepository(Company)
          .findOne({
            where: { id: order.company.id },
            select: { id: true, description: true, container: true },
            loadEagerRelations: false,
          });

        itemUpdated.mainImageUrl = await this.handlerFilesToUpload(
          mainImageUrl,
          eventId,
          order,
          'mainPhoto',
          company
        );
        itemUpdated.referenceImageUrl = await this.handlerFilesToUpload(
          referenceImageUrl,
          eventId,
          order,
          'refPhoto',
          company
        );
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

  async handlerFilesToUpload(
    img: string,
    eventId: number,
    order: Order,
    type: 'mainPhoto' | 'refPhoto',
    companie: Company
  ) {
    if (img && isBase64(img)) {
      const folder = companie?.container;
      let filesToUpload = {};
      const key = `${folder || 'contenedor-error'}/${order.orderNumber || order.id
        }/event_${eventId || 0}/${type}`;
      filesToUpload[key] = base64ToBlob(img, 'image/jpeg');
      const locations = await this.s3.uploadFile(
        key,
        base64ToBlob(img, 'image/jpeg'),
      );
      return locations;
    } else {
      return img;
    }
  }
}
