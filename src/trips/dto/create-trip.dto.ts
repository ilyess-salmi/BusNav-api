import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTripDto {
  @IsInt()
  bus_id!: number;

  @IsInt()
  driver_id!: number;

  @IsDateString()
  start_time!: string;

  @IsOptional()
  @IsDateString()
  end_time?: string;

  @IsString()
  @MaxLength(50)
  trip_status!: string;
}
