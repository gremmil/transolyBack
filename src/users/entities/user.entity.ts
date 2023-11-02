import { BaseEntityCustom } from "src/common/entities/base-entity.entity";
import { OrderEvent } from "src/order-events/entities/order-event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntityCustom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  userName: string;

  @Column('text')
  password: string;

  @OneToMany(() => OrderEvent, orderevent => orderevent.user, { cascade: true, eager: false }
  )
  orderevents: Array<OrderEvent>;
}
