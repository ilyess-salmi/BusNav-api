import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusLocation } from './entities/bus-location.entity';
import { Bus } from 'src/buses/entities/bus.entity';
import { CreateBusLocationDto } from './dto/create-bus-location.dto';
import { UpdateBusLocationDto } from './dto/update-bus-location.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BusLocationsService {
  constructor(
    @InjectRepository(BusLocation)
    private readonly repo: Repository<BusLocation>,

    @InjectRepository(Bus)
    private readonly busRepo: Repository<Bus>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['bus'] });
  }

  async create(dto: CreateBusLocationDto) {
    const bus = await this.busRepo.findOne({ where: { bus_id: dto.bus_id } });
    if (!bus) throw new NotFoundException(`Bus ${dto.bus_id} not found`);

    return this.repo.save(
      this.repo.create({
        latitude: dto.latitude,
        longitude: dto.longitude,
        speed: dto.speed,
        bus,
      }),
    );
  }

  async findOne(id: number) {
    const location = await this.repo.findOne({
      where: { location_id: id },
      relations: ['bus'],
    });

    if (!location) throw new NotFoundException(`Bus location ${id} not found`);
    return location;
  }

  async update(id: number, dto: UpdateBusLocationDto) {
    await this.findOne(id);

    let bus: Bus | undefined;
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

    await this.repo.update(id, {
      latitude: dto.latitude,
      longitude: dto.longitude,
      speed: dto.speed,
      bus,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
