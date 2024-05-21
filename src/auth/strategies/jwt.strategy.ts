import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    // Configuración de la estrategia JWT
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el JWT de la cabecera de autorización como un Bearer token
      ignoreExpiration: false, // No ignorar la expiración del token
      secretOrKey: process.env.JWT_SECRET, // Clave secreta para firmar y verificar el token
    });
  }

  // Método para validar el payload del JWT
  async validate(payload: JwtPayload) {
    // Retornar los datos del usuario extraídos del payload del token
    return {
      username: payload.username,
      role: payload.role,
      email: payload.email,
    };
  }
}
