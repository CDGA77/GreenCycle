import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Headers,
  InternalServerErrorException,
} from '@nestjs/common'; // Importa los decoradores y clases necesarios de '@nestjs/common'
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación
import { ApiTags, ApiOperation } from '@nestjs/swagger'; // Importa los decoradores de Swagger
import { AuthDto, RegisterDto } from '../dto/auth.dto'; // Importa los DTOs de autenticación
import { JwtAuthGuard } from '../guards/jwt-auth.guard'; // Importa el guardia de autenticación JWT

@ApiTags('auth') // Define las etiquetas de la API Swagger
@Controller('auth') // Define el controlador de autenticación
export class AuthController {
  constructor(private authService: AuthService) {} // Inyecta el servicio de autenticación en el constructor

  @ApiOperation({ summary: 'Registrar usuario' }) // Documenta la operación de registro en Swagger
  @Post('register') // Ruta para registrar un usuario
  async register(@Body() registerDto: RegisterDto) {
    // Manejador para el registro de usuarios
    return this.authService.register(registerDto); // Llama al método de registro del servicio de autenticación
  }

  @ApiOperation({ summary: 'Iniciar sesión' }) // Documenta la operación de inicio de sesión en Swagger
  @Post('login') // Ruta para iniciar sesión
  async login(@Body() authDto: AuthDto) {
    // Manejador para iniciar sesión
    return this.authService.login(authDto); // Llama al método de inicio de sesión del servicio de autenticación
  }

  @ApiOperation({ summary: 'Verificar token' }) // Documenta la operación de verificación de token en Swagger
  @Get('check') // Ruta para verificar el token
  @UseGuards(JwtAuthGuard) // Aplica el guardia JwtAuthGuard para proteger esta ruta
  async check(@Headers('Authorization') authHeader: string) {
    // Manejador para verificar el token
    try {
      const token = authHeader.replace('Bearer ', ''); // Extrae el token del encabezado Authorization
      return await this.authService.check(token); // Llama al método de verificación de token del servicio de autenticación
    } catch (error) {
      console.error('Error in token verification:', error); // Registra cualquier error en la verificación del token
      throw new InternalServerErrorException('Failed to verify token'); // Lanza una excepción si falla la verificación del token
    }
  }
}
