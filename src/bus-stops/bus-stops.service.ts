import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusStop } from './entities/bus-stop.entity';
import { CreateBusStopDto } from './dto/create-bus-stop.dto';
import { UpdateBusStopDto } from './dto/update-bus-stop.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BusStopsService {
  constructor(
    @InjectRepository(BusStop)
    private readonly repo: Repository<BusStop>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['services', 'passes'] });
  }

  create(dto: CreateBusStopDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async findOne(id: number) {
    const stop = await this.repo.findOne({
      where: { stop_id: id },
      relations: ['services', 'passes'],
    });

    if (!stop) throw new NotFoundException(`Bus stop ${id} not found`);
    return stop;
  }
  async update(id: number, dto: UpdateBusStopDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
