import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator'; // Importa decoradores de validación de class-validator
import { ApiProperty } from '@nestjs/swagger'; // Importa ApiProperty de @nestjs/swagger

export class CreateAdminDto {
  @ApiProperty() // Define la propiedad en la documentación de Swagger
  @IsString() // Valida que el valor sea una cadena de texto
  @IsNotEmpty() // Valida que el valor no esté vacío
  username: string; // Nombre de usuario

  @ApiProperty() // Define la propiedad en la documentación de Swagger
  @IsEmail() // Valida que el valor sea un correo electrónico válido
  @IsNotEmpty() // Valida que el valor no esté vacío
  email: string; // Correo electrónico

  @ApiProperty() // Define la propiedad en la documentación de Swagger
  @IsString() // Valida que el valor sea una cadena de texto
  @IsNotEmpty() // Valida que el valor no esté vacío
  password: string; // Contraseña

  @ApiProperty() // Define la propiedad en la documentación de Swagger
  @IsOptional() // Indica que el campo es opcional
  @IsString() // Valida que el valor sea una cadena de texto
  role: string; // Rol del administrador (opcional)
}
