import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pass } from './entities/pass.entity';
import { CreatePassDto } from './dto/create-pass.dto';
import { UpdatePassDto } from './dto/update-pass.dto';
import { Bus } from 'src/buses/entities/bus.entity';
import { BusStop } from 'src/bus-stops/entities/bus-stop.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PassesService {
  constructor(
    @InjectRepository(Pass)
    private readonly repo: Repository<Pass>,

    @InjectRepository(Bus)
    private readonly busRepo: Repository<Bus>,

    @InjectRepository(BusStop)
    private readonly busStopRepo: Repository<BusStop>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['bus', 'stop'] });
  }

  async create(dto: CreatePassDto) {
    const bus = await this.busRepo.findOne({ where: { bus_id: dto.bus_id } });
    if (!bus) throw new NotFoundException(`Bus ${dto.bus_id} not found`);

    const stop = await this.busStopRepo.findOne({
      where: { stop_id: dto.stop_id },
    });
    if (!stop) throw new NotFoundException(`Bus stop ${dto.stop_id} not found`);

    return this.repo.save(this.repo.create({ bus, stop }));
  }

  async findOne(id: number) {
    const pass = await this.repo.findOne({
      where: { id },
      relations: ['bus', 'stop'],
    });

    if (!pass) throw new NotFoundException(`Pass ${id} not found`);
    return pass;
  }
  async update(id: number, dto: UpdatePassDto) {
    await this.findOne(id);

    let bus: Bus | undefined = undefined;
    if (dto.bus_id) {
      const foundBus = await this.busRepo.findOne({
        where: { bus_id: dto.bus_id },
      });
      if (!foundBus) {
        throw new NotFoundException(`Bus ${dto.bus_id} not found`);
      }
      bus = foundBus;
      if (!bus) {
        throw new NotFoundException(`Bus ${dto.bus_id} not found`);
      }
    }

    let stop: BusStop | undefined = undefined;
    if (dto.stop_id) {
      const foundStop = await this.busStopRepo.findOne({
        where: { stop_id: dto.stop_id },
      });
      if (!foundStop) {
        throw new NotFoundException(`Bus stop ${dto.stop_id} not found`);
      }
      stop = foundStop;
      if (!stop) {
        throw new NotFoundException(`Bus stop ${dto.stop_id} not found`);
      }
    }
    await this.repo.update(id, { bus, stop });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
