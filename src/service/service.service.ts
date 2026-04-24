import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private repo: Repository<Service>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['busLine', 'stop'] });
  }

  async create(dto: CreateServiceDto) {
    const service = this.repo.create({
      busLine: { bus_line_id: dto.bus_line_id },
      stop: { stop_id: dto.stop_id },
    });

    return this.repo.save(service);
  }
}
