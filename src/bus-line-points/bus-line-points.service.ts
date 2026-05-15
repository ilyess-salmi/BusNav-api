import { Injectable } from '@nestjs/common';
import { CreateBusLinePointDto } from './dto/create-bus-line-point.dto';
import { UpdateBusLinePointDto } from './dto/update-bus-line-point.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { BusLinePoint } from './entities/bus-line-point.entity';
import { BusLine } from 'src/bus-lines/entities/bus-line.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusLinePointsService {
  constructor(
    @InjectRepository(BusLinePoint)
    private readonly busLinePointRepo: Repository<BusLinePoint>,

    @InjectRepository(BusLine)
    private readonly busLineRepo: Repository<BusLine>,
  ) {}
  async create(dto: CreateBusLinePointDto) {
    const busLine = await this.busLineRepo.findOne({
      where: { bus_line_id: dto.bus_line_id },
    });

    if (!busLine) {
      throw new NotFoundException(`Bus line ${dto.bus_line_id} not found`);
    }

    const point = this.busLinePointRepo.create({
      bus_line_id: dto.bus_line_id,
      point_order: dto.point_order,
      latitude: dto.latitude,
      longitude: dto.longitude,
      bus_line: busLine,
    });

    return this.busLinePointRepo.save(point);
  }

  findAll() {
    return this.busLinePointRepo.find({ relations: ['bus_line'] });
  }

  // async findOne(idLine: number) {
  //   const points = await this.busLinePointRepo.find({
  //     where: { bus_line_id: idLine },
  //     relations: ['bus_line'],
  //   });

  //   if (!points) {
  //     throw new NotFoundException(`Bus line point ${idLine} not found`);
  //   }
  //   return points;
  // }

  async findByLine(lineId: number) {
    return this.busLinePointRepo.find({
      where: { bus_line_id: lineId },
      order: { point_order: 'ASC' }, // important for correct route drawing
      relations: ['bus_line'],
    });
  }

  update(id: number, updateBusLinePointDto: UpdateBusLinePointDto) {
    return `This action updates a #${id} busLinePoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} busLinePoint`;
  }
}
