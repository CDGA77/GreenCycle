import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { AdminService } from '../../admin/services/admin.service';
import { RegisterDto, LoginDto } from '../dto/index';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar el rol y llamar al servicio correspondiente
    if (registerDto.role === 'admin') {
      return await this.adminService.create(registerDto);
    } else {
      return await this.usersService.create(registerDto);
    }
  }

  async login(loginDto: LoginDto) {
    // Implementar la lógica de autenticación y generación del token JWT
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateToken(user);
    return { token };
  }

  private async validateUser(loginDto: LoginDto) {
    // Implementar la lógica de validación del usuario (por ejemplo, verificar en la base de datos)
    // Este es un ejemplo básico, debes implementar la validación adecuada
    let user = null;
    if (loginDto.role === 'admin') {
      user = await this.adminService.findByCredentials(loginDto);
    } else {
      user = await this.usersService.findByCredentials(loginDto);
    }
    return user;
  }

  private generateToken(user: any) {
    // Generar el token JWT
    // Aquí puedes incluir información adicional en el token, como el ID del usuario, su rol, etc.
    return this.jwtService.sign({ id: user.id });
  }
}
