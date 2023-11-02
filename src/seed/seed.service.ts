import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed-data';
import { MastersService } from 'src/masters/masters.service';
import { DataSource, QueryRunner } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Company } from 'src/masters/entities/company.entity';
import { District } from 'src/masters/entities/district.entity';
import { Province } from 'src/masters/entities/province.entity';
import { Event } from 'src/masters/entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly mastersService: MastersService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
    private readonly dataSource: DataSource,

  ) { }
  async executeSeed() {
    await this.deleteAllData();
    //await this.insertAllData();
    await this.insertMasters();
    await this.insertUsers();
    await this.insertOrders();

    return 'SEED EXECUTE';
  }

  private async deleteAllData() {
    const queryRunner = this.dataSource.createQueryRunner();
    const masterEntities = [
      {
        target: Company,
        resetSequence: false
      },
      {
        target: Event,
        resetSequence: false
      },
      {
        target: Province,
        resetSequence: false
      },
      {
        target: District,
        resetSequence: false
      },
      {
        target: User,
        resetSequence: false
      },
      {
        target: Order,
        resetSequence: false
      },

    ]
    try {
      await queryRunner.startTransaction();
      masterEntities.forEach(async (entity) => {
        const { target, resetSequence } = entity;
        await queryRunner.manager.getRepository(target).delete({});
        /* if (resetSequence) {
          await this.resetSequence(target.name, queryRunner);
        } */
      })
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error
    } finally {
      await queryRunner.release();
    }
  }

  async resetSequence(tableName: string, queryRunner: QueryRunner) {
    try {
      const query = `ALTER SEQUENCE ${tableName}_id_seq RESTART WITH 1;`;
      await queryRunner.query(query);
    } catch (error) {
      throw error
    }
  }
  private async insertMasters() {
    const { companies, events, districts, provinces, users, orders } = initialData;
    companies.forEach(async (e) => {
      await this.mastersService.createCompany(e);
    });
    events.forEach(async (e) => {
      await this.mastersService.createEvent(e);
    });
    districts.forEach(async (e) => {
      await this.mastersService.createDistrict(e);
    });
    provinces.forEach(async (e) => {
      await this.mastersService.createProvince(e);
    });
    return true;
  }
  private async insertUsers() {
    const { users } = initialData;
    users.forEach(async (e) => {
      await this.usersService.create(e);
    })
    return true;
  }
  private async insertOrders() {
    const { orders } = initialData;

    orders.forEach(async (e) => {
      await this.ordersService.create(e);
    })
    return true;
  }

  private async insertAllData() {
    const { companies, events, districts, provinces, users, orders } = initialData;
    companies.forEach(async (e) => {
      await this.mastersService.createCompany(e);
    });
    events.forEach(async (e) => {
      await this.mastersService.createEvent(e);
    });
    districts.forEach(async (e) => {
      await this.mastersService.createDistrict(e);
    });
    provinces.forEach(async (e) => {
      await this.mastersService.createProvince(e);
    });
    users.forEach(async (e) => {
      await this.usersService.create(e);
    })
    orders.forEach(async (e) => {
      await this.ordersService.create(e);
    })
    return true;
  }
}
