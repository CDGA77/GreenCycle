import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Document } from 'mongoose';
import { Role } from 'src/auth/types/auth.type'; // Asumiendo que 'Role' está definido en este directorio

@Schema({ timestamps: true }) // Define el esquema de Mongoose con timestamp automático
export class Admin extends Document {
  // Define la clase Admin que extiende Document de Mongoose
  @IsOptional() // Indica que el campo es opcional
  @IsString() // Valida que el campo sea una cadena de texto
  @Transform(({ value }) => value.toLowerCase()) // Transforma el valor a minúsculas
  @Length(3, 40) // Limita la longitud del campo
  @Prop({ required: true }) // Define la propiedad del esquema con validación de requerimiento
  username?: string; // Nombre de usuario (opcional)

  @IsEmail() // Valida que el campo sea una dirección de correo electrónico
  @Transform(({ value }) => value.toLowerCase()) // Transforma el valor a minúsculas
  @Prop({ required: true }) // Define la propiedad del esquema con validación de requerimiento
  email: string; // Dirección de correo electrónico

  @IsNotEmpty() // Valida que el campo no esté vacío
  @IsString() // Valida que el campo sea una cadena de texto
  @Length(8, 100) // Limita la longitud del campo
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'password too weak', // Mensaje de error personalizado si no se cumple la expresión regular
  })
  @Prop({ required: true }) // Define la propiedad del esquema con validación de requerimiento
  password: string; // Contraseña

  @IsOptional() // Indica que el campo es opcional
  @IsIn(Object.values(Role)) // Valida que el valor esté dentro de los valores enumerados de 'Role'
  @IsEnum(Role) // Valida que el valor sea parte del enum 'Role'
  @Prop({ type: String, enum: Role, default: Role.USER }) // Define la propiedad del esquema con valores enumerados y un valor por defecto
  role: Role; // Rol del administrador
}

// Crea y exporta el esquema de Mongoose para la clase Admin
export const AdminSchema = SchemaFactory.createForClass(Admin);
