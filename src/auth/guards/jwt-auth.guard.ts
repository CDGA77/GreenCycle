import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable de NestJS
import { AuthGuard } from '@nestjs/passport'; // Importa AuthGuard de Passport

@Injectable() // Marca la clase como un proveedor de servicios inyectable
export class JwtAuthGuard extends AuthGuard('jwt') {} // Define la clase JwtAuthGuard que extiende de AuthGuard
