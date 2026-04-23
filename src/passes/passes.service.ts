import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pass } from './entities/pass.entity';

@Injectable()
export class PassesService {
  constructor(
    @InjectRepository(Pass)
    private repo: Repository<Pass>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['bus', 'stop'] });
  }

  create(data: Partial<Pass>) {
    return this.repo.save(this.repo.create(data));
  }
}
