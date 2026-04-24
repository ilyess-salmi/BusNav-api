import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pass } from './entities/pass.entity';
import { CreatePassDto } from './dto/create-pass.dto';
import { UpdatePassDto } from './dto/update-pass.dto';
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

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['bus', 'stop'],
    });
  }

  update(id: number, dto: UpdatePassDto) {
    return this.repo.update(id, {
      bus: dto.bus_id ? { bus_id: dto.bus_id } : undefined,
      stop: dto.stop_id ? { stop_id: dto.stop_id } : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
