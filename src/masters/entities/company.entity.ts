import { Entity, OneToMany } from "typeorm";
import { Master } from "./master.entity";
import { Order } from "src/orders/entities/order.entity";

@Entity()
export class Company extends Master {
  @OneToMany(() => Order, e => e.company)
  orders: Array<Order>;
}