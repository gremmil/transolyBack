import { Consultant } from "src/consultants/entities/consultant.entity";
import { Company } from "src/masters/entities/company.entity";
import { OrderEvent } from "src/order-events/entities/order-event.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'orders' })
@Unique(['orderNumber', 'company'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  orderNumber: string;

  @Column('float', {
    default: 0,
  })
  pieces: number;

  @Column('date', {
    nullable: true,
  })
  creationDate: Date;

  @Column('date', {
    nullable: true,
  })
  updateDate: Date;


  @ManyToOne(
    () => Company,
    (company) => company.orders,
  )
  company: Company;

  @ManyToOne(
    () => Consultant,
    (consultant) => consultant.orders,
  )
  consultant: Consultant;

  @OneToMany(
    () => OrderEvent,
    (orderevent) => orderevent.order
  )
  orderevents: Array<OrderEvent>

}
