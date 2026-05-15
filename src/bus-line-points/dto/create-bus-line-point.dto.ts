import { IsInt, IsNumber } from 'class-validator';

export class CreateBusLinePointDto {
  @IsInt()
  bus_line_id!: number;

  @IsInt()
  point_order!: number;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;
}
