import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { MastersModule } from 'src/masters/masters.module';
import { OrderEventsModule } from '../order-events/order-events.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => MastersModule),
    forwardRef(() => OrderEventsModule),
  ],
  exports: [
    OrdersService,
    TypeOrmModule,
  ]
})
export class OrdersModule { }
