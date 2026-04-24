import { IsDateString, IsInt, IsNumber, Max, Min } from 'class-validator';

export class CreatePredictionDto {
  @IsInt()
  trip_id!: number;

  @IsDateString()
  estimated_arrival_time!: string;

  @IsInt()
  @Min(0)
  delay_minutes!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  probability!: number;
}
