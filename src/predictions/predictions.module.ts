import { Module } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from './entities/prediction.entity';
import { Trip } from 'src/trips/entities/trip.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Prediction, Trip])],
  controllers: [PredictionsController],
  providers: [PredictionsService],
})
export class PredictionsModule {}
