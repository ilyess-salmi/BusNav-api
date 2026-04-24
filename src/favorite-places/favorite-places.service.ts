import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritePlace } from './entities/favorite-place.entity';
import { CreateFavoritePlaceDto } from './dto/create-favorite-place.dto';
@Injectable()
export class FavoritePlacesService {
  constructor(
    @InjectRepository(FavoritePlace)
    private repo: Repository<FavoritePlace>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }

  async create(dto: CreateFavoritePlaceDto) {
    const fp = this.repo.create({
      favorite_name: dto.favorite_name,
      latitude: dto.latitude,
      longitude: dto.longitude,
      user: { user_id: dto.user_id },
    });

    return this.repo.save(fp);
  }
}
