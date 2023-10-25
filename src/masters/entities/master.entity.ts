import { PrimaryGeneratedColumn, Column } from "typeorm";


export class Master {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  description: string;

}