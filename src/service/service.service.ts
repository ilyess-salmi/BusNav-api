import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private repo: Repository<Service>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['busLine', 'stop'] });
  }

  create(data: Partial<Service>) {
    return this.repo.save(this.repo.create(data));
  }
}
