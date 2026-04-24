import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateNotificationDto {
  @IsInt()
  user_id!: number;

  @IsString()
  @MinLength(3)
  @MaxLength(150)
  title!: string;

  @IsString()
  @MinLength(3)
  message!: string;

  @IsString()
  @MaxLength(50)
  type!: string;

  @IsOptional()
  @IsBoolean()
  is_read?: boolean;
}
