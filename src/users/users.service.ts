import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['role', 'driverProfile', 'favoritePlaces', 'notifications'],
    });
  }

  async create(dto: CreateUserDto) {
    const user = this.repo.create({
      user_name: dto.user_name,
      user_email: dto.user_email,
      user_password: dto.user_password,
      user_phone: dto.user_phone,
      role: { role_id: dto.role_id },
    });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { user_id: id },
      relations: ['role', 'driverProfile', 'favoritePlaces', 'notifications'],
    });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.repo.update(id, {
      user_name: dto.user_name,
      user_email: dto.user_email,
      user_password: dto.user_password,
      user_phone: dto.user_phone,
      role: dto.role_id ? { role_id: dto.role_id } : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
