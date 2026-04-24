import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusLocation } from './entities/bus-location.entity';
import { CreateBusLocationDto } from './dto/create-bus-location.dto';

@Injectable()
export class BusLocationsService {
  constructor(
    @InjectRepository(BusLocation)
    private repo: Repository<BusLocation>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['bus'] });
  }

  async create(dto: CreateBusLocationDto) {
    const loc = this.repo.create({
      latitude: dto.latitude,
      longitude: dto.longitude,
      speed: dto.speed,
      bus: { bus_id: dto.bus_id },
    });

    return this.repo.save(loc);
  }
}
