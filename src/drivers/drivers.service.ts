import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private repo: Repository<Driver>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user', 'trips'] });
  }

  create(data: Partial<Driver>) {
    return this.repo.save(this.repo.create(data));
  }
}
