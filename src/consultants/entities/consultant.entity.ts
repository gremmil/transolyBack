import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "src/orders/entities/order.entity";
import { ConsultantAddress } from "./consultant-address.entity";

@Entity()
export class Consultant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  code: string;

  @Column('text')
  name: string;

  @Column('text')
  phone: string;

  @OneToOne(() => ConsultantAddress, e => e.consultant)
  consultantAddress: ConsultantAddress;

  @OneToMany(() => Order, order => order.consultant)
  orders: Order[];
}
