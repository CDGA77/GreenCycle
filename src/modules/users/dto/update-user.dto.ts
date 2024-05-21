import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

// DTO (Data Transfer Object) para actualizar usuarios
export class UpdateUserDto {
  // Propiedad para el nombre de usuario
  @ApiProperty() // Decorador de Swagger para documentación
  @IsString() // Validador: el valor debe ser una cadena de texto
  @IsNotEmpty() // Validador: el valor no debe estar vacío
  username: string; // Tipo y nombre de la propiedad

  // Propiedad para el email del usuario
  @ApiProperty() // Decorador de Swagger para documentación
  @IsEmail() // Validador: el valor debe ser un email válido
  @IsNotEmpty() // Validador: el valor no debe estar vacío
  email: string; // Tipo y nombre de la propiedad

  // Propiedad para la contraseña del usuario
  @ApiProperty() // Decorador de Swagger para documentación
  @IsString() // Validador: el valor debe ser una cadena de texto
  @IsNotEmpty() // Validador: el valor no debe estar vacío
  password: string; // Tipo y nombre de la propiedad

  // Propiedad para el rol del usuario
  @ApiProperty() // Decorador de Swagger para documentación
  @IsOptional() // Validador: el campo es opcional
  @IsString() // Validador: el valor debe ser una cadena de texto
  role: string; // Tipo y nombre de la propiedad
}
