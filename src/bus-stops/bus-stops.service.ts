import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusStop } from './entities/bus-stop.entity';

@Injectable()
export class BusStopsService {
  constructor(
    @InjectRepository(BusStop)
    private repo: Repository<BusStop>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['services', 'passes'] });
  }

  create(data: Partial<BusStop>) {
    return this.repo.save(this.repo.create(data));
  }
}
