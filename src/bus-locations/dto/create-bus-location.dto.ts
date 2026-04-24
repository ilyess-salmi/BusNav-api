import { IsInt, IsLatitude, IsLongitude, IsNumber, Min } from 'class-validator';

export class CreateBusLocationDto {
  @IsInt()
  bus_id!: number;

  @IsLatitude()
  latitude!: number;

  @IsLongitude()
  longitude!: number;

  @IsNumber()
  @Min(0)
  speed!: number;
}
