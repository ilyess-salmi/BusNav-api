import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  user_name!: string;

  @IsEmail()
  @MaxLength(150)
  user_email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  user_password!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  user_phone?: string;

  @IsInt()
  role_id!: number;
}
