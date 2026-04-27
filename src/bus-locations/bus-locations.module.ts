import { Module } from '@nestjs/common';
import { BusLocationsService } from './bus-locations.service';
import { BusLocationsController } from './bus-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusLocation } from './entities/bus-location.entity';
import { Bus } from 'src/buses/entities/bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusLocation, Bus])],
  controllers: [BusLocationsController],
  providers: [BusLocationsService],
})
export class BusLocationsModule {}
