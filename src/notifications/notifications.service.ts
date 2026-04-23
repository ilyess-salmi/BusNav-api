import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private repo: Repository<Notification>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  create(data: Partial<Notification>) {
    return this.repo.save(this.repo.create(data));
  }
}
