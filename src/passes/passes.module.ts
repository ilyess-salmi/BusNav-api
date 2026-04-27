import { Module } from '@nestjs/common';
import { PassesService } from './passes.service';
import { PassesController } from './passes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pass } from './entities/pass.entity';
import { Bus } from 'src/buses/entities/bus.entity';
import { BusStop } from 'src/bus-stops/entities/bus-stop.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Pass, Bus, BusStop])],
  controllers: [PassesController],
  providers: [PassesService],
})
export class PassesModule {}
