import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
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

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['busLine', 'stop'],
    });
  }

  update(id: number, dto: UpdateServiceDto) {
    return this.repo.update(id, {
      busLine: dto.bus_line_id ? { bus_line_id: dto.bus_line_id } : undefined,
      stop: dto.stop_id ? { stop_id: dto.stop_id } : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
