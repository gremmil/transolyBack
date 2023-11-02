import { Module, forwardRef } from '@nestjs/common';
import { OrderEventsService } from './order-events.service';
import { OrderEventsController } from './order-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEvent } from './entities/order-event.entity';
import { MastersModule } from 'src/masters/masters.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [OrderEventsController],
  providers: [OrderEventsService],
  imports: [
    TypeOrmModule.forFeature([OrderEvent]),
    forwardRef(() => MastersModule),
    forwardRef(() => UsersModule)
  ],
  exports: [
    OrderEventsService,
    TypeOrmModule
  ]
})
export class OrderEventsModule { }
