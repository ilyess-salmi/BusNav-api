import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoritePlacesService } from './favorite-places.service';
import { CreateFavoritePlaceDto } from './dto/create-favorite-place.dto';
import { UpdateFavoritePlaceDto } from './dto/update-favorite-place.dto';

@Controller('favorite-places')
export class FavoritePlacesController {
  constructor(private readonly favoritePlacesService: FavoritePlacesService) {}

  @Post()
  create(@Body() createFavoritePlaceDto: CreateFavoritePlaceDto) {
    return this.favoritePlacesService.create(createFavoritePlaceDto);
  }

  @Get()
  findAll() {
    return this.favoritePlacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritePlacesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoritePlaceDto: UpdateFavoritePlaceDto,
  ) {
    return this.favoritePlacesService.update(+id, updateFavoritePlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritePlacesService.remove(+id);
  }
}
