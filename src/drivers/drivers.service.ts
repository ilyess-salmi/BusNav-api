import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { User } from 'src/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly repo: Repository<Driver>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user', 'trips'] });
  }

  async create(dto: CreateDriverDto) {
    const user = await this.userRepo.findOne({
      where: { user_id: dto.user_id },
    });
    if (!user) throw new NotFoundException(`User ${dto.user_id} not found`);

    return this.repo.save(
      this.repo.create({
        license_number: dto.license_number,
        user,
      }),
    );
  }

  async findOne(id: number) {
    const driver = await this.repo.findOne({
      where: { driver_id: id },
      relations: ['user', 'trips'],
    });

    if (!driver) throw new NotFoundException(`Driver ${id} not found`);
    return driver;
  }

  async update(id: number, dto: UpdateDriverDto) {
    await this.findOne(id);

    let user: User | undefined = undefined;
    if (dto.user_id) {
      const foundUser = await this.userRepo.findOne({
        where: { user_id: dto.user_id },
      });
      if (!foundUser)
        throw new NotFoundException(`User ${dto.user_id} not found`);
      user = foundUser;
    }

    await this.repo.update(id, {
      license_number: dto.license_number,
      user,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
