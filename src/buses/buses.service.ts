import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entities/bus.entity';
import { BusLine } from 'src/bus-lines/entities/bus-line.entity';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private readonly repo: Repository<Bus>,

    @InjectRepository(BusLine)
    private readonly busLineRepo: Repository<BusLine>,
  ) {}
  findAll() {
    return this.repo.find({
      relations: ['busLine', 'locations', 'trips', 'passes'],
    });
  }

  async create(dto: CreateBusDto) {
    const busLine = await this.busLineRepo.findOne({
      where: { bus_line_id: dto.bus_line_id },
    });

    if (!busLine) {
      throw new NotFoundException(`Bus line ${dto.bus_line_id} not found`);
    }
    return this.repo.save(
      this.repo.create({
        plate_number: dto.plate_number,
        capacity: dto.capacity,
        status: dto.status,
        busLine,
      }),
    );
  }

  async findOne(id: number) {
    const bus = await this.repo.findOne({
      where: { bus_id: id },
      relations: ['busLine', 'locations', 'trips', 'passes'],
    });

    if (!bus) throw new NotFoundException(`Bus ${id} not found`);
    return bus;
  }

  async update(id: number, dto: UpdateBusDto) {
    await this.findOne(id);

    let busLine: BusLine | undefined;
    if (dto.bus_line_id) {
      const foundBusLine = await this.busLineRepo.findOne({
        where: { bus_line_id: dto.bus_line_id },
      });
      if (!foundBusLine) {
        throw new NotFoundException(`Bus line ${dto.bus_line_id} not found`);
      }
      busLine = foundBusLine;
    }

    await this.repo.update(id, {
      plate_number: dto.plate_number,
      capacity: dto.capacity,
      status: dto.status,
      busLine,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
