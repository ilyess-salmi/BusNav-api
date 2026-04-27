import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { BusLine } from 'src/bus-lines/entities/bus-line.entity';
import { BusStop } from 'src/bus-stops/entities/bus-stop.entity';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly repo: Repository<Service>,

    @InjectRepository(BusLine)
    private readonly busLineRepo: Repository<BusLine>,

    @InjectRepository(BusStop)
    private readonly busStopRepo: Repository<BusStop>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['busLine', 'stop'] });
  }

  async create(dto: CreateServiceDto) {
    const busLine = await this.busLineRepo.findOne({
      where: { bus_line_id: dto.bus_line_id },
    });
    if (!busLine) {
      throw new NotFoundException(`Bus line ${dto.bus_line_id} not found`);
    }

    const stop = await this.busStopRepo.findOne({
      where: { stop_id: dto.stop_id },
    });
    if (!stop) throw new NotFoundException(`Bus stop ${dto.stop_id} not found`);

    return this.repo.save(this.repo.create({ busLine, stop }));
  }

  async findOne(id: number) {
    const service = await this.repo.findOne({
      where: { id },
      relations: ['busLine', 'stop'],
    });

    if (!service) throw new NotFoundException(`Service ${id} not found`);
    return service;
  }

  async update(id: number, dto: UpdateServiceDto) {
    await this.findOne(id);

    let busLine: BusLine | undefined = undefined;
    if (dto.bus_line_id) {
      const foundBusLine = await this.busLineRepo.findOne({
        where: { bus_line_id: dto.bus_line_id },
      });
      if (!foundBusLine) {
        throw new NotFoundException(`Bus line ${dto.bus_line_id} not found`);
      }
      busLine = foundBusLine;
      if (!busLine) {
        throw new NotFoundException(`Bus line ${dto.bus_line_id} not found`);
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

    await this.repo.update(id, { busLine, stop });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
