import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Trip } from './entities/trip.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Bus } from 'src/buses/entities/bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Bus, Driver])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
