import { Module } from '@nestjs/common';
import { BusLinesService } from './bus-lines.service';
import { BusLinesController } from './bus-lines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusLine } from './entities/bus-line.entity';
import { BusStop } from 'src/bus-stops/entities/bus-stop.entity';
import { Bus } from 'src/buses/entities/bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusLine, BusStop, Bus])],
  controllers: [BusLinesController],
  providers: [BusLinesService],
})
export class BusLinesModule {}
