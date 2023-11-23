import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { MastersService } from '../masters/masters.service';
import { CreateOrderEventDto } from 'src/order-events/dto/create-order-event.dto';
import { OrderEventsService } from 'src/order-events/order-events.service';
import { FindOneOrderDto } from './dto/find-one-order.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class OrdersService {

  private findOptions: FindOneOptions<Order> = {
    relations: {
      company: true,
      orderevents: { event: true, user: true },
    },
    order: { orderevents: { createDate: 'DESC' } },
    select: {
      company: {
        id: true,
        description: true,
      },
      orderevents: {
        event: {
          id: true,
          description: true,
        },
        user: {
          id: true,
          userName: true
        },
      },
    },
  }
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderEventsService: OrderEventsService,
    private mastersService: MastersService
  ) {

  }

  async create(dto: CreateOrderDto) {
    try {
      const { companyId, ...detailsOrder } = dto;
      const itemCreated = this.orderRepository.create({
        ...detailsOrder,
        company: await this.mastersService.findOneCompany(companyId),
        orderevents: []
      });
      const itemSaved = await this.orderRepository.save(itemCreated);
      const initOrderEvents: Array<CreateOrderEventDto> = [
        {
          eventId: 1,
          userId: null,
          orderId: itemSaved.id,
          latitude: '',
          longitude: '',
          mainImageURL: '',
          referenceImageURL: '',
          observations: '',
        },
        {
          eventId: 2,
          userId: null,
          orderId: itemSaved.id,
          latitude: '',
          longitude: '',
          mainImageURL: '',
          referenceImageURL: '',
          observations: '',
        }
      ];
      initOrderEvents.forEach(async (e) => {
        await this.orderEventsService.create(e);
      })
      return itemSaved;
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: PaginationDto): Promise<Array<Order>> {
    try {
      const { limit = 10, offset = 0 } = dto;
      return await this.orderRepository.find({
        take: limit,
        skip: offset,
        ...this.findOptions
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllStatics(): Promise<Array<{ count: number, companyDescripcion: string }>> {
    try {
      const queryBuilder = this.orderRepository.createQueryBuilder('order')
        .select('COUNT(order.id)', 'count')
        .addSelect('company.description', 'companyDescripcion')
        .innerJoin('order.company', 'company')
        .groupBy('company.id')
        .orderBy('count', 'DESC');

      return await queryBuilder.getRawMany();
    } catch (error) {
      console.log('Error en el método findAllStatics:', error);
      throw error;
    }
  }


  async findOne(dto: FindOneOrderDto) {
    try {
      const { id, companyId, orderNumber } = dto;
      let order: Order;

      if (id) {
        order = await this.orderRepository.findOne({
          where: { id },
          ...this.findOptions
        });
        if (!order) {
          throw new NotFoundException('No order was found with the given ID.');
        }
      } else {
        order = await this.orderRepository.findOne({
          where: { company: { id: companyId }, orderNumber },
          ...this.findOptions
        });
        if (!order) {
          throw new NotFoundException('No order was found with the given companyId and/or orderNumber.');
        }
      }
      return order;
    } catch (error) {
      throw error;
    }
  }


  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async deleteAllOrders() {
    const query = await this.orderRepository.createQueryBuilder('order');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      throw error;
    }

  }
}
