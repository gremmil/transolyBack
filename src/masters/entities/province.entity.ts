import { Entity, OneToMany } from "typeorm";
import { Master } from "./master.entity";
import { ConsultantAddress } from "src/consultants/entities/consultant-address.entity";

@Entity()
export class Province extends Master {
  @OneToMany(() => ConsultantAddress, e => e.province)
  consultantAddresses: Array<ConsultantAddress>;
}