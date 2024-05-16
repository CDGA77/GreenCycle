import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, AuthDto } from './auth.dto';
import { Role } from './auth.type';
import { AdminService } from 'src/modules/admin/services/admin.service';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{
    accessToken: string;
    user: { id: number; username: string; role: Role };
  }> {
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

    const payload = { id: user.id, username: user.username, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: { id: user.id, username: user.username, role: user.role },
    };
  }

  async login(authDto: AuthDto): Promise<{
    accessToken: string;
    user: { id: number; username: string; role: Role };
  }> {
    const { email, password } = authDto;

    const user = await this.userService.findUserByEmail(email);
    const admin = await this.adminService.findAdminByEmail(email);

    if (!user && !admin) {
      // Usuario no encontrado
      throw new Error('Credenciales inválidas');
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user ? user.password : admin.password,
    );

    if (!isValidPassword) {
      // Contraseña incorrecta
      throw new Error('Credenciales inválidas');
    }

    const payload = {
      id: user ? user.id : admin.id,
      username: user ? user.username : admin.username, // Ajustado para usar user o admin según corresponda
      role: user ? Role.USER : Role.ADMIN,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user ? user.id : admin.id,
        username: user ? user.username : admin.username, // Ajustado para usar user o admin según corresponda
        role: user ? Role.USER : Role.ADMIN,
      },
    };
  }
}
