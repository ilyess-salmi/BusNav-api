import { IsInt } from 'class-validator';

export class CreateServiceDto {
  @IsInt()
  bus_line_id!: number;

  @IsInt()
  stop_id!: number;
}
