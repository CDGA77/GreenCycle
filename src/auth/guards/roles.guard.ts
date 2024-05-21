import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'; // Importa los decoradores y clases necesarias de NestJS
import { Reflector } from '@nestjs/core'; // Importa el Reflector de NestJS
import { Role } from '../types/auth.type'; // Importa el enum de roles

@Injectable() // Decorador para marcar la clase como un proveedor de servicios inyectable
export class RolesGuard implements CanActivate {
  // Define la clase RolesGuard que implementa la interfaz CanActivate
  constructor(private reflector: Reflector) {} // Inyecta el Reflector en el constructor

  canActivate(context: ExecutionContext): boolean {
    // Método canActivate para determinar si el usuario tiene los roles necesarios
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      // Obtiene los roles requeridos del contexto utilizando el Reflector
      context.getHandler(), // Obtiene los roles definidos a nivel de método/controlador
      context.getClass(), // Obtiene los roles definidos a nivel de clase
    ]);

    if (!requiredRoles) {
      // Si no se definen roles, se permite el acceso
      return true;
    }

    const { user } = context.switchToHttp().getRequest(); // Obtiene el usuario del contexto de la solicitud
    const userRole = user.role; // Obtiene el rol del usuario de la solicitud

    return requiredRoles.some((role) => role === userRole); // Comprueba si el usuario tiene al menos uno de los roles requeridos
  }
}
