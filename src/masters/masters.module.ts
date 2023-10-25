import { Module } from '@nestjs/common';
import { MastersService } from './masters.service';
import { MastersController } from './masters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { District } from './entities/district.entity';
import { Event } from './entities/event.entity';
import { Province } from './entities/province.entity';

@Module({
  controllers: [MastersController],
  providers: [MastersService],
  imports: [
    TypeOrmModule.forFeature([Company, District, Event, Province])
  ],
  exports: [
    MastersService,
    TypeOrmModule
  ]
})
export class MastersModule { }
