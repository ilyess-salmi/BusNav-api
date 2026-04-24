import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusStop } from './entities/bus-stop.entity';
import { CreateBusStopDto } from './dto/create-bus-stop.dto';

@Injectable()
export class BusStopsService {
  constructor(
    @InjectRepository(BusStop)
    private repo: Repository<BusStop>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['services', 'passes'] });
  }

  create(dto: CreateBusStopDto) {
    return this.repo.save(this.repo.create(dto));
  }
}
