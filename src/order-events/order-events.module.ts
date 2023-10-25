import { Module } from '@nestjs/common';
import { OrderEventsService } from './order-events.service';
import { OrderEventsController } from './order-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEvent } from './entities/order-event.entity';

@Module({
  controllers: [OrderEventsController],
  providers: [OrderEventsService],
  imports: [
    TypeOrmModule.forFeature([OrderEvent])
  ],
  exports: [
    OrderEventsService,
    TypeOrmModule
  ]
})
export class OrderEventsModule { }
