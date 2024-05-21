import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Document } from 'mongoose';
import { Role } from 'src/auth/types/auth.type';

// Definición del esquema de Mongoose para el modelo de usuario
@Schema({ timestamps: true }) // Se establece que el esquema tenga campos de fecha de creación y actualización
export class User extends Document {
  // Propiedad del esquema: nombre de usuario
  @IsOptional() // Indica que el campo es opcional
  @IsString() // Valida que el valor sea una cadena de texto
  @Transform(({ value }) => value.toLowerCase()) // Transforma el valor a minúsculas antes de validarlo
  @Length(3, 40) // Valida la longitud del nombre de usuario
  @Prop({ required: true }) // Define la propiedad como requerida en el esquema de Mongoose
  username?: string; // Define el tipo de la propiedad y su nombre

  // Propiedad del esquema: email
  @IsEmail() // Valida que el valor sea una dirección de correo electrónico válida
  @Transform(({ value }) => value.toLowerCase()) // Transforma el valor a minúsculas antes de validarlo
  @Prop({ required: true }) // Define la propiedad como requerida en el esquema de Mongoose
  email: string; // Define el tipo de la propiedad y su nombre

  // Propiedad del esquema: contraseña
  @IsNotEmpty() // Valida que el valor no esté vacío
  @IsString() // Valida que el valor sea una cadena de texto
  @Length(8, 100) // Valida la longitud de la contraseña
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'password too weak', // Define un mensaje personalizado para el error
  }) // Valida la fortaleza de la contraseña mediante expresiones regulares
  @Prop({ required: true }) // Define la propiedad como requerida en el esquema de Mongoose
  password: string; // Define el tipo de la propiedad y su nombre

  // Propiedad del esquema: rol del usuario
  @IsNotEmpty() // Valida que el valor no esté vacío
  @IsOptional() // Indica que el campo es opcional
  @IsEnum(Role) // Valida que el valor esté dentro de un conjunto de valores enumerados
  @Prop({ type: String, enum: Role, default: Role.USER }) // Define la propiedad como tipo enumerado con un valor por defecto
  role: Role; // Define el tipo de la propiedad y su nombre
}

// Creación del esquema de Mongoose para el modelo de usuario
export const UserSchema = SchemaFactory.createForClass(User);
