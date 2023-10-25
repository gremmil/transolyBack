import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "src/orders/entities/order.entity";
import { Consultant } from "./consultant.entity";
import { District } from "src/masters/entities/district.entity";
import { Province } from "src/masters/entities/province.entity";

@Entity()
export class ConsultantAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  latitude: string;

  @Column('text')
  longitude: string;

  @Column('text')
  descripcion: string;

  @OneToOne(() => Consultant, e => e.consultantAddress)
  consultant: Consultant;

  @ManyToOne(
    () => District,
    (e) => e.consultantAddresses,
  )
  district: District;

  @ManyToOne(
    () => Province,
    (e) => e.consultantAddresses,
  )
  province: Province;
}
