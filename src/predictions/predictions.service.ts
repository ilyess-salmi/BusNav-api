import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prediction } from './entities/prediction.entity';
import { CreatePredictionDto } from './dto/create-prediction.dto';
@Injectable()
export class PredictionsService {
  constructor(
    @InjectRepository(Prediction)
    private repo: Repository<Prediction>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['trip'] });
  }

  async create(dto: CreatePredictionDto) {
    const pred = this.repo.create({
      estimated_arrival_time: dto.estimated_arrival_time,
      delay_minutes: dto.delay_minutes,
      probability: dto.probability,
      trip: { trip_id: dto.trip_id },
    });

    return this.repo.save(pred);
  }
}
