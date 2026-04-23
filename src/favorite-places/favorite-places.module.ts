import { Module } from '@nestjs/common';
import { FavoritePlacesService } from './favorite-places.service';
import { FavoritePlacesController } from './favorite-places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritePlace } from './entities/favorite-place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritePlace])],
  controllers: [FavoritePlacesController],
  providers: [FavoritePlacesService],
})
export class FavoritePlacesModule {}
