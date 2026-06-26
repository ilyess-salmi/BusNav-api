import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FavoritePlacesService } from './favorite-places.service';
import { CreateFavoritePlaceDto } from './dto/create-favorite-place.dto';
import { UpdateFavoritePlaceDto } from './dto/update-favorite-place.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('favorite-places')
export class FavoritePlacesController {
  constructor(private readonly favoritePlacesService: FavoritePlacesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  create(@Body() createFavoritePlaceDto: CreateFavoritePlaceDto) {
    return this.favoritePlacesService.create(createFavoritePlaceDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  findAll(@Query('user_id') userId?: string) {
    return this.favoritePlacesService.findAll(userId ? +userId : undefined);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  findOne(@Param('id') id: string) {
    return this.favoritePlacesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  update(
    @Param('id') id: string,
    @Body() updateFavoritePlaceDto: UpdateFavoritePlaceDto,
  ) {
    return this.favoritePlacesService.update(+id, updateFavoritePlaceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  remove(@Param('id') id: string) {
    return this.favoritePlacesService.remove(+id);
  }
}
