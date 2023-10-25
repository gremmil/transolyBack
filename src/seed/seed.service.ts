import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed-data';
import { OrdersService } from 'src/orders/orders.service';
import { MastersService } from 'src/masters/masters.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly mastersService: MastersService

  ) { }
  async executeSeed() {
    await this.insertNewMasters();
    return 'SEED EXECUTE';
  }

  private async insertNewMasters() {

    this.mastersService.deleteAllMasters();
    const { companies, events, districts, provinces } = initialData;
    let insertPromises = [];
    companies.forEach(e => {
      insertPromises.push(this.mastersService.createCompany(e));
    });
    await Promise.all(insertPromises);

    insertPromises = [];
    events.forEach(e => {
      insertPromises.push(this.mastersService.createEvent(e));
    });
    await Promise.all(insertPromises);

    insertPromises = [];
    districts.forEach(e => {
      insertPromises.push(this.mastersService.createDistrict(e));
    });
    await Promise.all(insertPromises);

    insertPromises = [];
    provinces.forEach(e => {
      insertPromises.push(this.mastersService.createProvince(e));
    });
    await Promise.all(insertPromises);


    return true;

  }


}
