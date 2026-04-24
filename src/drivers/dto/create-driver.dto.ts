import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDriverDto {
  @IsInt()
  user_id!: number;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  license_number!: string;
}
