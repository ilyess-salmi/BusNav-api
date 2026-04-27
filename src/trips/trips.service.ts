import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Bus } from 'src/buses/entities/bus.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly repo: Repository<Trip>,

    @InjectRepository(Bus)
    private readonly busRepo: Repository<Bus>,

    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['bus', 'driver', 'predictions'],
    });
  }

  async create(dto: CreateTripDto) {
    const bus = await this.busRepo.findOne({ where: { bus_id: dto.bus_id } });
    if (!bus) throw new NotFoundException(`Bus ${dto.bus_id} not found`);

    const driver = await this.driverRepo.findOne({
      where: { driver_id: dto.driver_id },
    });
    if (!driver) {
      throw new NotFoundException(`Driver ${dto.driver_id} not found`);
    }
    return this.repo.save(
      this.repo.create({
        start_time: dto.start_time,
        end_time: dto.end_time,
        trip_status: dto.trip_status,
        bus,
        driver,
      }),
    );
  }

  async update(id: number, dto: UpdateTripDto) {
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
    }

    let driver: Driver | undefined = undefined;
    if (dto.driver_id) {
      const foundDriver = await this.driverRepo.findOne({
        where: { driver_id: dto.driver_id },
      });
      if (!foundDriver) {
        throw new NotFoundException(`Driver ${dto.driver_id} not found`);
      }
      driver = foundDriver;
      if (!driver) {
        throw new NotFoundException(`Driver ${dto.driver_id} not found`);
      }
    }

    await this.repo.update(id, {
      start_time: dto.start_time,
      end_time: dto.end_time,
      trip_status: dto.trip_status,
      bus,
      driver,
    });

    return this.findOne(id);
  }
  async findOne(id: number) {
    const trip = await this.repo.findOne({
      where: { trip_id: id },
      relations: ['bus', 'driver', 'predictions'],
    });

    if (!trip) throw new NotFoundException(`Trip ${id} not found`);
    return trip;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
