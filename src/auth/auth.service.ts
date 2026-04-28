import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepo.findOne({
      where: { user_email: dto.user_email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const role = await this.roleRepo.findOne({
      where: { role_id: dto.role_id },
    });

    if (!role) {
      throw new NotFoundException(`Role ${dto.role_id} not found`);
    }

    const hashedPassword = await bcrypt.hash(dto.user_password, 10);

    const user = this.userRepo.create({
      user_name: dto.user_name,
      user_email: dto.user_email,
      user_password: hashedPassword,
      user_phone: dto.user_phone,
      role,
    });

    const savedUser = await this.userRepo.save(user);

    const { user_password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { user_email: dto.user_email },
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.user_password,
      user.user_password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = {
      sub: user.user_id,
      email: user.user_email,
      role: user.role.role_name,
    };

    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
