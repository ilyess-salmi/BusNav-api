import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prediction } from './entities/prediction.entity';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
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

  findOne(id: number) {
    return this.repo.findOne({
      where: { pred_id: id },
      relations: ['trip'],
    });
  }

  update(id: number, dto: UpdatePredictionDto) {
    return this.repo.update(id, {
      estimated_arrival_time: dto.estimated_arrival_time,
      delay_minutes: dto.delay_minutes,
      probability: dto.probability,
      trip: dto.trip_id ? { trip_id: dto.trip_id } : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
