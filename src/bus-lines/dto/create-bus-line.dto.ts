import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBusLineDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  line_name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  start_point!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  end_point!: string;
}
