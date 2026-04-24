import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entities/bus.entity';
import { CreateBusDto } from './dto/create-bus.dto';

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

  async create(dto: CreateBusDto) {
    const bus = this.repo.create({
      plate_number: dto.plate_number,
      capacity: dto.capacity,
      status: dto.status,
      busLine: { bus_line_id: dto.bus_line_id },
    });

    return this.repo.save(bus);
  }
}
