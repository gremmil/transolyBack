import { BaseEntityCustom } from "src/common/entities/base-entity.entity";
import { Column, PrimaryColumn } from "typeorm";


export class Master extends BaseEntityCustom {
  @PrimaryColumn()
  id: number;

  @Column()
  description: string;

}