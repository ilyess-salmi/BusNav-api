import { Module } from '@nestjs/common';
import { BusStopsService } from './bus-stops.service';
import { BusStopsController } from './bus-stops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusStop } from './entities/bus-stop.entity';
@Module({
  imports: [TypeOrmModule.forFeature([BusStop])],
  controllers: [BusStopsController],
  providers: [BusStopsService],
})
export class BusStopsModule {}
