import { Module } from '@nestjs/common'; // Importa el módulo de NestJS
import { AuthService } from './services/auth.service'; // Importa el servicio de autenticación
import { AuthController } from './controllers/auth.controller'; // Importa el controlador de autenticación
import { RolesGuard } from './guards/roles.guard'; // Importa el guardia de roles
import { JwtStrategy } from './strategies/jwt.strategy'; // Importa la estrategia JWT
import { JwtModule } from '@nestjs/jwt'; // Importa el módulo JWT de NestJS
import { PassportModule } from '@nestjs/passport'; // Importa el módulo de Passport para autenticación
import { AdminModule } from 'src/modules/admin/admin.module'; // Importa el módulo de administradores
import { UsersModule } from 'src/modules/users/users.module'; // Importa el módulo de usuarios

@Module({
  imports: [
    PassportModule, // Importa PassportModule para la autenticación
    JwtModule.register({
      // Configura el módulo JWT para la generación y verificación de tokens
      secret: process.env.JWT_SECRET, // Utiliza el secreto JWT definido en las variables de entorno
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }, // Opciones de firma del token con un tiempo de expiración
    }),
    AdminModule, // Importa el módulo de administradores para utilizar sus servicios
    UsersModule, // Importa el módulo de usuarios para utilizar sus servicios
  ],
  controllers: [AuthController], // Declara el controlador de autenticación
  providers: [AuthService, JwtStrategy, RolesGuard], // Declara los proveedores de servicios necesarios para la autenticación
  exports: [AuthService, JwtStrategy, JwtModule, PassportModule], // Exporta los servicios y módulos necesarios para ser utilizados en otros módulos
})
export class AuthModule {} // Define y exporta el módulo de autenticación
