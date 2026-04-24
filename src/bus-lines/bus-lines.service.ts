import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusLine } from './entities/bus-line.entity';
import { CreateBusLineDto } from './dto/create-bus-line.dto';
import { UpdateBusLineDto } from './dto/update-bus-line.dto';

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

  findOne(id: number) {
    return this.repo.findOne({
      where: { bus_line_id: id },
      relations: ['buses', 'services'],
    });
  }

  update(id: number, dto: UpdateBusLineDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
