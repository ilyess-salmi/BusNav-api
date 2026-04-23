import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
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

  findOne(id: number) {
    return this.repo.findOne({
      where: { user_id: id },
      relations: ['role', 'driverProfile'],
    });
  }

  create(data: Partial<User>) {
    return this.repo.save(this.repo.create(data));
  }

  update(id: number, data: Partial<User>) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
