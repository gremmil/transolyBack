import { Module } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { ConsultantsController } from './consultants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultant } from './entities/consultant.entity';
import { ConsultantAddress } from './entities/consultant-address.entity';

@Module({
  controllers: [ConsultantsController],
  providers: [ConsultantsService],
  imports: [
    TypeOrmModule.forFeature([Consultant, ConsultantAddress])
  ],
  exports: [
    ConsultantsService,
    TypeOrmModule,
  ]
})
export class ConsultantsModule { }
