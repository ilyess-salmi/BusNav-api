import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusLocation } from './entities/bus-location.entity';

@Injectable()
export class BusLocationsService {
  constructor(
    @InjectRepository(BusLocation)
    private repo: Repository<BusLocation>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['bus'] });
  }

  create(data: Partial<BusLocation>) {
    return this.repo.save(this.repo.create(data));
  }
}
