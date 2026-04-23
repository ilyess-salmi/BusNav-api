import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private repo: Repository<Trip>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['bus', 'driver', 'predictions'],
    });
  }

  create(data: Partial<Trip>) {
    return this.repo.save(this.repo.create(data));
  }
}
