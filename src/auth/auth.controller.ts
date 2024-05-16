import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthDto, RegisterDto } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Role } from './auth.type';
import { Roles } from './roles.decorator';

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

  @ApiOperation({ summary: 'Ruta protegida para administradores' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('admin-route')
  async adminRoute() {
    return 'Esta es una ruta protegida para administradores';
  }

  @ApiOperation({ summary: 'Ruta protegida para usuarios' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('user-route')
  async userRoute() {
    return 'Esta es una ruta protegida para usuarios';
  }
}
