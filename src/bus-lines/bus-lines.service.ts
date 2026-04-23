import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusLine } from './entities/bus-line.entity';

@Injectable()
export class BusLinesService {
  constructor(
    @InjectRepository(BusLine)
    private repo: Repository<BusLine>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['buses'] });
  }

  create(data: Partial<BusLine>) {
    return this.repo.save(this.repo.create(data));
  }
}
