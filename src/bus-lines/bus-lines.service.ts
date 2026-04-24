import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusLine } from './entities/bus-line.entity';
import { CreateBusLineDto } from './dto/create-bus-line.dto';

@Injectable()
export class BusLinesService {
  constructor(
    @InjectRepository(BusLine)
    private repo: Repository<BusLine>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['buses'] });
  }

  create(dto: CreateBusLineDto) {
    return this.repo.save(this.repo.create(dto));
  }
}
