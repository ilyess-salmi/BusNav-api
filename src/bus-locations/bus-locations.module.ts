import { Module } from '@nestjs/common';
import { BusLocationsService } from './bus-locations.service';
import { BusLocationsController } from './bus-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusLocation } from './entities/bus-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusLocation])],
  controllers: [BusLocationsController],
  providers: [BusLocationsService],
})
export class BusLocationsModule {}
