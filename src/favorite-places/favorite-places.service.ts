import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritePlace } from './entities/favorite-place.entity';
import { CreateFavoritePlaceDto } from './dto/create-favorite-place.dto';
import { UpdateFavoritePlaceDto } from './dto/update-favorite-place.dto';
import { User } from 'src/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
@Injectable()
export class FavoritePlacesService {
  constructor(
    @InjectRepository(FavoritePlace)
    private readonly repo: Repository<FavoritePlace>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll(userId?: number) {
    return this.repo.find({
      where: userId ? { user: { user_id: userId } } : {},
      relations: ['user'],
    });
  }

  async create(dto: CreateFavoritePlaceDto) {
    const user = await this.userRepo.findOne({
      where: { user_id: dto.user_id },
    });
    if (!user) throw new NotFoundException(`User ${dto.user_id} not found`);

    return this.repo.save(this.repo.create({ ...dto, user }));
  }

  async findOne(id: number) {
    const place = await this.repo.findOne({
      where: { favorite_id: id },
      relations: ['user'],
    });

    if (!place) throw new NotFoundException(`Favorite place ${id} not found`);
    return place;
  }

  async update(id: number, dto: UpdateFavoritePlaceDto) {
    await this.findOne(id);

    const { user_id, ...rest } = dto;

    let user: User | undefined;
    if (user_id) {
      const foundUser = await this.userRepo.findOne({ where: { user_id } });
      if (!foundUser) throw new NotFoundException(`User ${user_id} not found`);
      user = foundUser;
    }

    await this.repo.update(id, { ...rest, ...(user && { user }) });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repo.delete(id);
  }
}
