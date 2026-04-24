import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private repo: Repository<Driver>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user', 'trips'] });
  }

  async create(dto: CreateDriverDto) {
    const driver = this.repo.create({
      license_number: dto.license_number,
      user: { user_id: dto.user_id },
    });

    return this.repo.save(driver);
  }
}
