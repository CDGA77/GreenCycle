import { IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  username?: string;

  @IsString()
  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role: string;
}
