import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['users'] });
  }

  create(dto: CreateRoleDto) {
    return this.repo.save(this.repo.create(dto));
  }
  async findOne(id: number) {
    const role = await this.repo.findOne({
      where: { role_id: id },
      relations: ['users'],
    });

    if (!role) throw new NotFoundException(`Role ${id} not found`);
    return role;
  }

  async update(id: number, dto: UpdateRoleDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
