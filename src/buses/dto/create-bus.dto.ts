import {
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBusDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  plate_number!: string;

  @IsInt()
  @IsPositive()
  capacity!: number;

  @IsString()
  @MaxLength(50)
  status!: string;

  @IsInt()
  bus_line_id!: number;
}
