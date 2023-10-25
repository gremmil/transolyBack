import { Entity, OneToMany } from "typeorm";
import { Master } from "./master.entity";
import { OrderEvent } from "src/order-events/entities/order-event.entity";

@Entity()
export class Event extends Master {
  @OneToMany(() => OrderEvent, orderevent => orderevent.event)
  orderevents: Array<OrderEvent>;
}
