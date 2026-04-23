import { Module } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from './entities/prediction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prediction])],
  controllers: [PredictionsController],
  providers: [PredictionsService],
})
export class PredictionsModule {}
