import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusLinePointsService } from './bus-line-points.service';
import { BusLinePointsController } from './bus-line-points.controller';
import { BusLinePoint } from './entities/bus-line-point.entity';
import { BusLine } from '../bus-lines/entities/bus-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusLinePoint, BusLine])],
  controllers: [BusLinePointsController],
  providers: [BusLinePointsService],
})
export class BusLinePointsModule {}
