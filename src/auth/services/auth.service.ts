import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, AuthDto } from '../dto/auth.dto';
import { Role } from '../types/auth.type';
import { AdminService } from 'src/modules/admin/services/admin.service';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{
    accessToken: string;
    user: { id: number; username: string; role: Role };
  }> {
    try {
      const { username, password, role } = registerDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      let user: any;

      if (role === Role.USER) {
        user = await this.userService.createUser({
          username,
          password: hashedPassword,
          email: registerDto.email,
          role: registerDto.role,
        });
      } else {
        user = await this.adminService.createAdmin({
          username,
          password: hashedPassword,
          email: registerDto.email,
          role: registerDto.role,
        });
      }

      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        password: user.password,
      };
      console.log('Register payload :', payload);
      console.log(process.env.JWT_SECRET);
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      console.log('Generated access token:', accessToken);

      return {
        accessToken,
        user: { id: user.id, username: user.username, role: user.role, email: user.email},
      };
    } catch (error) {
      console.error('Error in register:', error);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login(authDto: AuthDto): Promise<{
    accessToken: string;
    user: { id: number; username: string; role: Role };
  }> {
    try {
      const { email, password } = authDto;

      const user = await this.userService.findUserByEmail(email);
      const admin = await this.adminService.findAdminByEmail(email);

      if (!user && !admin) {
        throw new Error('Credenciales inválidas');
      }

      const isValidPassword = await bcrypt.compare(
        password,
        user ? user.password : admin.password,
      );

      if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
      }

      const payload = {
        id: user ? user.id : admin.id,
        username: user ? user.username : admin.username,
        role: user ? Role.USER : Role.ADMIN,
      };
      console.log('Login payload:', payload);
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      console.log('Generated access token:', accessToken);

      return {
        accessToken,
        user: {
          id: user ? user.id : admin.id,
          username: user ? user.username : admin.username,
          role: user ? Role.USER : Role.ADMIN,
          email: user ? user.email : admin.email,
        },
      };
    } catch (error) {
      console.error('Error in login:', error);
      throw new InternalServerErrorException('Failed to login');
    }
  }
}
