import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private repo: Repository<Role>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['users'] });
  }

  create(data: Partial<Role>) {
    return this.repo.save(this.repo.create(data));
  }
}
