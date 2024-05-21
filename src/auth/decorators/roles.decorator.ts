import { SetMetadata } from '@nestjs/common';
import { Role } from '../types/auth.type'; // Importa el enum Role desde el archivo auth.type

export const ROLES_KEY = 'roles'; // Define una clave para los metadatos de roles
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles); // Define un decorador Roles que acepta roles como argumento y utiliza SetMetadata para asignar los roles a la clave ROLES_KEY
