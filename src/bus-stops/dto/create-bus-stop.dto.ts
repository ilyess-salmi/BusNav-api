import {
  IsLatitude,
  IsLongitude,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBusStopDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  stop_name!: string;

  @IsLatitude()
  latitude!: number;

  @IsLongitude()
  longitude!: number;
}
