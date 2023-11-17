import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { OrdersModule } from './orders/orders.module';
import { MastersModule } from './masters/masters.module';
import { UsersModule } from './users/users.module';
import { OrderEventsModule } from './order-events/order-events.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: (process.env.STATE === 'prod')
        ? {
          rejectUnauthorized: false,
          sslmode: 'require'
        } : false as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      entityPrefix: ''
    }),
    CommonModule,
    SeedModule,
    OrdersModule,
    OrderEventsModule,
    MastersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
