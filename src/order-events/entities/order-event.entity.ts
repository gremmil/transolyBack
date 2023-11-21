import { ValidateNested } from "class-validator";
import { BaseEntityCustom } from "src/common/entities/base-entity.entity";
import { Event } from "src/masters/entities/event.entity";
import { Order } from "src/orders/entities/order.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'order-events' })
@Unique(['order.id', 'event.id'])
export class OrderEvent extends BaseEntityCustom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  observations: string;

  @Column('text', { nullable: true })
  mainImageUrl: string;

  @Column('text', { nullable: true })
  referenceImageUrl: string;


  @Column('text', { nullable: true })
  longitude: string;

  @Column('text', { nullable: true })
  latitude: string;

  @ManyToOne(
    () => Order,
    (order) => order.orderevents,
    { onDelete: 'CASCADE', nullable: false, eager: false }
  )
  order: Order;

  @ManyToOne(
    () => Event,
    (event) => event.orderevents,
    { onDelete: 'CASCADE', nullable: false, },
  )
  event: Event;

  @ManyToOne(
    () => User,
    (user) => user.orderevents,
    { onDelete: 'CASCADE', nullable: true },
  )
  user: User;

}


