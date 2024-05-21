import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// DTO (Data Transfer Object) para la creación de usuarios
export class CreateUserDto {
  // Propiedad para el nombre de usuario
  @ApiProperty() // Decorador de Swagger para documentación
  @IsString() // Validador: el valor debe ser una cadena de texto
  @IsOptional() // Validador: el campo es opcional
  username: string; // Tipo y nombre de la propiedad

  // Propiedad para el email del usuario
  @ApiProperty() // Decorador de Swagger para documentación
  @IsEmail() // Validador: el valor debe ser un email válido
  email: string; // Tipo y nombre de la propiedad

  // Propiedad para la contraseña del usuario
  @ApiProperty() // Decorador de Swagger para documentación
  @IsNotEmpty() // Validador: el valor no debe estar vacío
  @IsString() // Validador: el valor debe ser una cadena de texto
  password: string; // Tipo y nombre de la propiedad

  // Propiedad para el rol del usuario
  @ApiProperty() // Decorador de Swagger para documentación
  @IsOptional() // Validador: el campo es opcional
  @IsString() // Validador: el valor debe ser una cadena de texto
  role: string; // Tipo y nombre de la propiedad
}
