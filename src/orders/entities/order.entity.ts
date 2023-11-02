import { BaseEntityCustom } from "src/common/entities/base-entity.entity";
import { Company } from "src/masters/entities/company.entity";
import { OrderEvent } from "src/order-events/entities/order-event.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'orders' })
@Unique(['orderNumber', 'company.id'])
export class Order extends BaseEntityCustom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  orderNumber: string;

  @Column('float', {
    default: 0,
  })
  pieces: number;

  @Column('text')
  consultantCode: string;

  @Column('text')
  consultantName: string;

  @Column('text')
  consultantPhone: string;

  @Column('text')
  address: string;

  @Column('text')
  latitude: string;

  @Column('text')
  longitude: string;

  @OneToMany(
    () => OrderEvent,
    (orderevent) => orderevent.order,
    { cascade: true, eager: true, lazy: true },
  )
  orderevents: Array<OrderEvent>

  @ManyToOne(
    () => Company,
    (company) => company.orders,
    { onDelete: 'CASCADE', lazy: true, nullable: false },
  )
  company: Company

}
