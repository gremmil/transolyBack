import { Event } from "src/masters/entities/event.entity";
import { Order } from "src/orders/entities/order.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders' })

export class OrderEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  observations: string;

  @Column('text')
  mainPhotoUrl: string;

  @Column('text')
  referencePhotoUrl: string;


  @Column('text')
  longitude: string;

  @Column('text')
  latitude: string;

  @Column('date')
  creationDate: Date;

  @Column('date', {
    nullable: true,
  })
  updateDate: Date;


  @ManyToOne(
    () => Order,
    (order) => order.orderevents
  )
  order: Order;

  @ManyToOne(
    () => Event,
    (event) => event.orderevents
  )
  event: Event;


  @ManyToOne(
    () => User,
    (user) => user.orderevents
  )
  user: User;

}


