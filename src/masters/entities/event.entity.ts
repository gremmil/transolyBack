import { Column, Entity, OneToMany } from "typeorm";
import { Master } from "./master.entity";
import { OrderEvent } from "src/order-events/entities/order-event.entity";

@Entity()
export class Event extends Master {

  @Column('bool', {
    nullable: true
  })
  showInWeb: boolean;

  @OneToMany(() => OrderEvent, orderevent => orderevent.event, { cascade: true, eager: false }
  )
  orderevents: Array<OrderEvent>;
}
