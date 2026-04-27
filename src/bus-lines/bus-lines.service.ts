import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusLine } from './entities/bus-line.entity';
import { CreateBusLineDto } from './dto/create-bus-line.dto';
import { UpdateBusLineDto } from './dto/update-bus-line.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class BusLinesService {
  constructor(
    @InjectRepository(BusLine)
    private readonly repo: Repository<BusLine>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['buses'] });
  }

  create(dto: CreateBusLineDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async findOne(id: number) {
    const line = await this.repo.findOne({
      where: { bus_line_id: id },
      relations: ['buses', 'services'],
    });

    if (!line) throw new NotFoundException(`Bus line ${id} not found`);
    return line;
  }

  async update(id: number, dto: UpdateBusLineDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
