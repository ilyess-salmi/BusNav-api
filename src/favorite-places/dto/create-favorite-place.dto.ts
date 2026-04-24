import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateFavoritePlaceDto {
  @IsInt()
  user_id!: number;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  favorite_name!: string;

  @IsLatitude()
  latitude!: number;

  @IsLongitude()
  longitude!: number;
}
