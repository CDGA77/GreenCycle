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
  constructor(
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para registrar un nuevo usuario
  async register(registerDto: RegisterDto): Promise<{
    accessToken: string;
    user: { id: number; username: string; role: Role; email: string };
  }> {
    try {
      // Desestructurar datos del DTO de registro
      const { username, password, role, email } = registerDto;

      // Hash de la contraseña del usuario
      const hashedPassword = await bcrypt.hash(password, 10);

      let user;

      // Crear usuario o admin según el rol
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

      // Crear payload para el JWT
      const payload: JwtPayload = {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      };

      // Generar tokens JWT
      const { access_token } = await this.getTokens(payload);

      // Retornar token de acceso y datos del usuario
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
      // Manejo de errores en el registro
      console.error('Error in register:', error);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  // Método para loguear un usuario
  async login(authDto: AuthDto): Promise<{
    accessToken: string;
    user: { id: number; username: string; role: Role; email: string };
  }> {
    try {
      // Desestructurar datos del DTO de autenticación
      const { email, password } = authDto;

      // Buscar usuario por email en ambas tablas (users y admins)
      const user =
        (await this.userService.findUserByEmail(email)) ||
        (await this.adminService.findAdminByEmail(email));

      // Si no se encuentra el usuario, lanzar excepción
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Validar la contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);

      // Si la contraseña no es válida, lanzar excepción
      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Crear payload para el JWT
      const payload: JwtPayload = {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      };

      // Generar tokens JWT
      const { access_token } = await this.getTokens(payload);

      // Retornar token de acceso y datos del usuario
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
      // Manejo de errores en el login
      console.error('Error in login:', error);
      throw new InternalServerErrorException('Failed to login');
    }
  }

  // Método para verificar el token JWT
  async check(token: string): Promise<JwtPayload> {
    try {
      // Verificar el token usando el servicio JWT y la clave secreta
      return this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      // Manejo de errores en la validación del token
      console.error('Error in token validation:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Método para obtener tokens JWT
  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not set');
    }
    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    };

    // Firmar el token JWT
    const accessToken = await this.signToken(
      jwtPayload,
      secretKey,
      accessTokenOptions,
    );

    return { access_token: accessToken };
  }

  // Método auxiliar para firmar el token JWT
  async signToken(payload: JwtPayload, secretKey: string, options: any) {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options,
    });
  }
}
