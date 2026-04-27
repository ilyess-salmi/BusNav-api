import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { BusStop } from 'src/bus-stops/entities/bus-stop.entity';
import { BusLine } from 'src/bus-lines/entities/bus-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bus, BusStop, BusLine])],
  controllers: [BusesController],
  providers: [BusesService],
})
export class BusesModule {}
