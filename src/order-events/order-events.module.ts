import { Module, forwardRef } from '@nestjs/common';
import { OrderEventsService } from './order-events.service';
import { OrderEventsController } from './order-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEvent } from './entities/order-event.entity';
import { MastersModule } from 'src/masters/masters.module';
import { UsersModule } from 'src/users/users.module';
import { S3Service } from 'src/common/services/s3.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [OrderEventsController],
  providers: [OrderEventsService, S3Service],
  imports: [
    TypeOrmModule.forFeature([OrderEvent]),
    forwardRef(() => MastersModule),
    forwardRef(() => UsersModule),
    NestjsFormDataModule
  ],
  exports: [
    OrderEventsService,
    TypeOrmModule
  ]
})
export class OrderEventsModule { }
