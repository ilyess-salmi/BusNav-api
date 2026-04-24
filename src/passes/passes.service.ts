import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pass } from './entities/pass.entity';
import { CreatePassDto } from './dto/create-pass.dto';

@Injectable()
export class PassesService {
  constructor(
    @InjectRepository(Pass)
    private repo: Repository<Pass>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['bus', 'stop'] });
  }

  async create(dto: CreatePassDto) {
    const pass = this.repo.create({
      bus: { bus_id: dto.bus_id },
      stop: { stop_id: dto.stop_id },
    });

    return this.repo.save(pass);
  }
}
