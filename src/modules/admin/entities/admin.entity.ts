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

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class Admin extends Document {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @Length(3, 40)
  @Prop({ required: true })
  username?: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @Prop({ required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'password too weak',
  })
  @Prop({ required: true })
  password: string;

  @IsOptional()
  @IsIn(Object.values(UserRole))
  @IsEnum(UserRole)
  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
