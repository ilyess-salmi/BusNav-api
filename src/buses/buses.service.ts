import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entities/bus.entity';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private repo: Repository<Bus>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['busLine', 'locations', 'trips', 'passes'],
    });
  }

  create(data: Partial<Bus>) {
    return this.repo.save(this.repo.create(data));
  }
}
