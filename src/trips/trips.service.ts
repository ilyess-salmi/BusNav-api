import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private repo: Repository<Trip>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['bus', 'driver', 'predictions'],
    });
  }

  async create(dto: CreateTripDto) {
    const trip = this.repo.create({
      start_time: dto.start_time,
      end_time: dto.end_time,
      trip_status: dto.trip_status,
      bus: { bus_id: dto.bus_id },
      driver: { driver_id: dto.driver_id },
    });

    return this.repo.save(trip);
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { trip_id: id },
      relations: ['bus', 'driver', 'predictions'],
    });
  }

  update(id: number, dto: UpdateTripDto) {
    return this.repo.update(id, {
      start_time: dto.start_time,
      end_time: dto.end_time,
      trip_status: dto.trip_status,
      bus: dto.bus_id ? { bus_id: dto.bus_id } : undefined,
      driver: dto.driver_id ? { driver_id: dto.driver_id } : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
