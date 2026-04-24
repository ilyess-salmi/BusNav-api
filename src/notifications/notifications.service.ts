import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private repo: Repository<Notification>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  async create(dto: CreateNotificationDto) {
    const notif = this.repo.create({
      title: dto.title,
      message: dto.message,
      type: dto.type,
      is_read: dto.is_read ?? false,
      user: { user_id: dto.user_id },
    });

    return this.repo.save(notif);
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { notif_id: id },
      relations: ['user'],
    });
  }

  update(id: number, dto: UpdateNotificationDto) {
    return this.repo.update(id, {
      title: dto.title,
      message: dto.message,
      type: dto.type,
      is_read: dto.is_read,
      user: dto.user_id ? { user_id: dto.user_id } : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
