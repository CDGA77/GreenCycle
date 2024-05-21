import { IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto {
  // Campo opcional para actualizar el nombre de usuario
  @IsOptional()
  @ApiProperty() // Define la propiedad en la documentación de Swagger
  @IsString() // Valida que el valor sea una cadena de texto
  username?: string; // Nombre de usuario

  // Campo obligatorio para actualizar el correo electrónico
  @IsString() // Valida que el valor sea una cadena de texto
  @ApiProperty() // Define la propiedad en la documentación de Swagger
  @IsEmail() // Valida que el valor sea un correo electrónico válido
  email?: string; // Correo electrónico

  // Campo obligatorio para actualizar la contraseña
  @ApiProperty() // Define la propiedad en la documentación de Swagger
  @IsNotEmpty() // Valida que el valor no esté vacío
  @IsString() // Valida que el valor sea una cadena de texto
  password?: string; // Contraseña

  // Campo opcional para actualizar el rol
  @ApiProperty() // Define la propiedad en la documentación de Swagger
  @IsOptional() // Indica que el campo es opcional
  @IsString() // Valida que el valor sea una cadena de texto
  role: string; // Rol del administrador
}
