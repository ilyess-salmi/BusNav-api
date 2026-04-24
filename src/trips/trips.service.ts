import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
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
}
