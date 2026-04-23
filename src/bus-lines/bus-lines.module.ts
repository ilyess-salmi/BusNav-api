import { Module } from '@nestjs/common';
import { BusLinesService } from './bus-lines.service';
import { BusLinesController } from './bus-lines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusLine } from './entities/bus-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusLine])],
  controllers: [BusLinesController],
  providers: [BusLinesService],
})
export class BusLinesModule {}
