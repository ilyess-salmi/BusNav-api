import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Trip } from './entities/trip.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Bus } from 'src/buses/entities/bus.entity';
import { BusLine } from 'src/bus-lines/entities/bus-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Bus, Driver, BusLine])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
