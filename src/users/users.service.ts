import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/roles/entities/role.entity';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['role', 'driverProfile', 'favoritePlaces', 'notifications'],
    });
  }

  async create(dto: CreateUserDto) {
    const role = await this.roleRepo.findOne({
      where: { role_id: dto.role_id },
    });
    if (!role) throw new NotFoundException(`Role ${dto.role_id} not found`);

    const user = this.repo.create({
      user_name: dto.user_name,
      user_email: dto.user_email,
      user_password: dto.user_password,
      user_phone: dto.user_phone,
      role,
    });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: { user_id: id },
      relations: ['role', 'driverProfile', 'favoritePlaces', 'notifications'],
    });

    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);

    let role: Role | undefined = undefined;

    if (dto.role_id) {
      const foundRole = await this.roleRepo.findOne({
        where: { role_id: dto.role_id },
      });

      if (!foundRole) {
        throw new NotFoundException(`Role ${dto.role_id} not found`);
      }

      role = foundRole;
    }

    await this.repo.update(id, {
      user_name: dto.user_name,
      user_email: dto.user_email,
      user_password: dto.user_password,
      user_phone: dto.user_phone,
      role,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
