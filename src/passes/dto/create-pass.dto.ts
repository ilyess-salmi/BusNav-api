import { IsInt } from 'class-validator';

export class CreatePassDto {
  @IsInt()
  bus_id!: number;

  @IsInt()
  stop_id!: number;
}
