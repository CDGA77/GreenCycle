import { Role } from '../types/auth.type';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterDto extends AuthDto {
  @ApiProperty({ enum: ['user', 'admin'] })
  role: Role;
}
