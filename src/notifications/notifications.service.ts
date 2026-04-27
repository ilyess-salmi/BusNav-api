import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { User } from 'src/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private repo: Repository<Notification>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  async create(dto: CreateNotificationDto) {
    const user = await this.userRepo.findOne({
      where: { user_id: dto.user_id },
    });
    if (!user) throw new NotFoundException(`User ${dto.user_id} not found`);

    return this.repo.save(
      this.repo.create({
        title: dto.title,
        message: dto.message,
        type: dto.type,
        is_read: dto.is_read ?? false,
        user,
      }),
    );
  }

  async findOne(id: number) {
    const notification = await this.repo.findOne({
      where: { notif_id: id },
      relations: ['user'],
    });

    if (!notification)
      throw new NotFoundException(`Notification ${id} not found`);
    return notification;
  }

  async update(id: number, dto: UpdateNotificationDto) {
    await this.findOne(id);

    let user: User | undefined = undefined;
    if (dto.user_id) {
      const FindUser = await this.userRepo.findOne({
        where: { user_id: dto.user_id },
      });
      if (!FindUser)
        throw new NotFoundException(`User ${dto.user_id} not found`);
      user = FindUser;
    }

    await this.repo.update(id, {
      title: dto.title,
      message: dto.message,
      type: dto.type,
      is_read: dto.is_read,
      user,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
