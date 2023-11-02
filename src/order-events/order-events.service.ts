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
import { UsersService } from '../users/users.service';
import { Order } from 'src/orders/entities/order.entity';
import { FindOneOrderEventDto } from './dto/find-one-order-event.dto';
import { Event } from 'src/masters/entities/event.entity';
import { User } from 'src/users/entities/user.entity';

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
    private readonly mastersService: MastersService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
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
        let itemCreated = await this.orderEventRepository.create({
          ...detailsOrderEvent,
          event: await queryRunner.manager
            .getRepository(Event)
            .findOne({
              where: { id: eventId },
              select: { id: true, description: true },
            }),
          order: await queryRunner.manager
            .getRepository(Order)
            .findOne({ where: { id: orderId }, relations: { company: false, }, select: { id: true, }, loadEagerRelations: false, }),
        });
        if (userId) {
          itemCreated.user = await queryRunner.manager
            .getRepository(User)
            .findOne({
              where: { id: userId },
              select: { id: true, userName: true },
              loadEagerRelations: false
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

  async findAll(userId: string) {
    try {
      const orderEventList = await this.orderEventRepository.find({
        where: { user: { id: userId } },
        ...this.findOptions
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

  async update(id: string, dto: UpdateOrderEventDto) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { eventId, userId, orderId, ...detailsOrderEvent } = dto;
      const existingOrderEvent = await this.findOne({ id });
      const updatedOrderEvent = await this.orderEventRepository.merge(
        existingOrderEvent,
        detailsOrderEvent
      );
      if (eventId) {
        updatedOrderEvent.event = await queryRunner.manager
          .getRepository(Event)
          .findOne({
            where: { id: eventId },
            select: { id: true, description: true },
          });
      }
      if (userId) {
        updatedOrderEvent.user = await queryRunner.manager
          .getRepository(User)
          .findOne({
            where: { id: userId },
            select: { id: true, userName: true },
          });
      }
      const itemSaved = await this.orderEventRepository.save(updatedOrderEvent);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return itemSaved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async remove(id: string) {
    const product = await this.findOne({ id });
    await this.orderEventRepository.remove(product);
  }
}
