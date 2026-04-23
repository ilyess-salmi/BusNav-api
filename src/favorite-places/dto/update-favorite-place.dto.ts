import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoritePlaceDto } from './create-favorite-place.dto';

export class UpdateFavoritePlaceDto extends PartialType(CreateFavoritePlaceDto) {}
