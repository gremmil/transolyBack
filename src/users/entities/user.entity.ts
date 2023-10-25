import { OrderEvent } from "src/order-events/entities/order-event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => OrderEvent, orderevent => orderevent.user)
  orderevents: Array<OrderEvent>;
}
