import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prediction } from './entities/prediction.entity';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { Trip } from 'src/trips/entities/trip.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
@Injectable()
export class PredictionsService {
  constructor(
    @InjectRepository(Prediction)
    private readonly repo: Repository<Prediction>,

    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['trip'] });
  }

  async create(dto: CreatePredictionDto) {
    const trip = await this.tripRepo.findOne({
      where: { trip_id: dto.trip_id },
    });
    if (!trip) throw new NotFoundException(`Trip ${dto.trip_id} not found`);

    return this.repo.save(
      this.repo.create({
        estimated_arrival_time: dto.estimated_arrival_time,
        delay_minutes: dto.delay_minutes,
        probability: dto.probability,
        trip,
      }),
    );
  }

  async findOne(id: number) {
    const prediction = await this.repo.findOne({
      where: { pred_id: id },
      relations: ['trip'],
    });

    if (!prediction) throw new NotFoundException(`Prediction ${id} not found`);
    return prediction;
  }

  async update(id: number, dto: UpdatePredictionDto) {
    await this.findOne(id);

    let trip: Trip | undefined = undefined;
    if (dto.trip_id) {
      const foundTrip = await this.tripRepo.findOne({
        where: { trip_id: dto.trip_id },
      });
      if (!foundTrip) {
        throw new NotFoundException(`Trip ${dto.trip_id} not found`);
      }
      trip = foundTrip;
      if (!trip) throw new NotFoundException(`Trip ${dto.trip_id} not found`);
    }

    await this.repo.update(id, {
      estimated_arrival_time: dto.estimated_arrival_time,
      delay_minutes: dto.delay_minutes,
      probability: dto.probability,
      trip,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
