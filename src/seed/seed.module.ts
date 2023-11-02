import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { OrdersModule } from 'src/orders/orders.module';
import { MastersModule } from '../masters/masters.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    OrdersModule,
    MastersModule,
    UsersModule
  ]
})
export class SeedModule { }
