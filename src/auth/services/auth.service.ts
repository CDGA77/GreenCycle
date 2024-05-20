import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, AuthDto } from '../dto/auth.dto';
import { Role } from '../types/auth.type';
import { AdminService } from 'src/modules/admin/services/admin.service';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtPayload, Tokens } from '../interface/index';

@Injectable()
export class AuthService {
  verifyToken() {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{
    accessToken: string;
    user: { id: number; username: string; role: Role; email: string };
  }> {
    try {
      const { username, password, role, email } = registerDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      let user;

      if (role === Role.USER) {
        user = await this.userService.createUser({
          username,
          password: hashedPassword,
          email,
          role,
        });
      } else {
        user = await this.adminService.createAdmin({
          username,
          password: hashedPassword,
          email,
          role,
        });
      }

      const payload: JwtPayload = {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        password: user.password,
      };

      const { access_token } = await this.getTokens(payload);

      return {
        accessToken: access_token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
        },
      };
    } catch (error) {
      console.error('Error in register:', error);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login(authDto: AuthDto): Promise<{
    accessToken: string;
    user: { id: number; username: string; role: Role; email: string };
  }> {
    try {
      const { email, password } = authDto;

      const user =
        (await this.userService.findUserByEmail(email)) ||
        (await this.adminService.findAdminByEmail(email));

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JwtPayload = {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        password: user.password,
      };

      const { access_token } = await this.getTokens(payload);

      return {
        accessToken: access_token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
        },
      };
    } catch (error) {
      console.error('Error in login:', error);
      throw new InternalServerErrorException('Failed to login');
    }
  }

  async check(token: string): Promise<JwtPayload> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload;
    } catch (error) {
      console.error('Error in token validation:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not set');
    }
    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    };

    const accessToken = await this.signToken(
      jwtPayload,
      secretKey,
      accessTokenOptions,
    );

    return { access_token: accessToken };
  }

  async signToken(payload: JwtPayload, secretKey: string, options: any) {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options,
    });
  }
}
