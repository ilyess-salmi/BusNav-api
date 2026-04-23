import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritePlace } from './entities/favorite-place.entity';
@Injectable()
export class FavoritePlacesService {
  constructor(
    @InjectRepository(FavoritePlace)
    private repo: Repository<FavoritePlace>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  create(data: Partial<FavoritePlace>) {
    return this.repo.save(this.repo.create(data));
  }
}
