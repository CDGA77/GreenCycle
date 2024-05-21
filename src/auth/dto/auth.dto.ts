import { Role } from '../types/auth.type'; // Importa el enum Role desde el archivo auth.type
import { ApiProperty } from '@nestjs/swagger'; // Importa ApiProperty de Swagger para decorar las propiedades de la clase DTO

export class AuthDto { // Define la clase base AuthDto para la autenticación
  @ApiProperty() // Decorador ApiProperty para definir metadatos de documentación Swagger
  username: string; // Propiedad para el nombre de usuario

  @ApiProperty() // Decorador ApiProperty para definir metadatos de documentación Swagger
  email: string; // Propiedad para el correo electrónico

  @ApiProperty() // Decorador ApiProperty para definir metadatos de documentación Swagger
  password: string; // Propiedad para la contraseña
}

export class RegisterDto extends AuthDto { // Define la clase RegisterDto que hereda de AuthDto para el registro de usuarios
  @ApiProperty({ enum: ['user', 'admin'] }) // Decorador ApiProperty para definir metadatos de documentación Swagger con opciones de enum
  role: Role; // Propiedad para el rol del usuario, que se valida con el enum Role
}
