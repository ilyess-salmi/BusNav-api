import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { BusStop } from 'src/bus-stops/entities/bus-stop.entity';
import { BusLine } from 'src/bus-lines/entities/bus-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, BusLine, BusStop])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
