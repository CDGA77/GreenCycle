import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Headers,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthDto, RegisterDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registrar usuario' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Iniciar sesión' })
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @ApiOperation({ summary: 'Verificar token' })
  @Get('check')
  @UseGuards(JwtAuthGuard)
  async check(@Headers('Authorization') authHeader: string) {
    try {
      const token = authHeader.replace('Bearer ', '');
      return await this.authService.check(token);
    } catch (error) {
      console.error('Error in token verification:', error);
      throw new InternalServerErrorException('Failed to verify token');
    }
  }
}
