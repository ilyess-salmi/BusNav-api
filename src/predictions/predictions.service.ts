import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prediction } from './entities/prediction.entity';
@Injectable()
export class PredictionsService {
  constructor(
    @InjectRepository(Prediction)
    private repo: Repository<Prediction>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['trip'] });
  }

  create(data: Partial<Prediction>) {
    return this.repo.save(this.repo.create(data));
  }
}
