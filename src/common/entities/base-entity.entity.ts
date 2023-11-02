import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntityCustom extends BaseEntity {
  /*   @Column({ type: 'text', nullable: true })
    createDate: string;
  
    @Column({ type: 'text', nullable: true })
    updateDate: string; */

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updateDate: Date;

  @BeforeUpdate()
  setUpdate() {
    this.updateDate = setDateFormat();
  }
  @BeforeInsert()
  setInsert() {
    this.updateDate = null;
    this.createDate = setDateFormat();
  }
}
function setDateFormat(): Date {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localTime = now.getTime() - offset;
  const targetDate = new Date(localTime);
  return targetDate;
}