import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/index';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Método para crear un nuevo usuario
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    const { email } = createUserDto;
    // Verificar si ya existe un usuario con el mismo email
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      // Si ya existe un usuario con el mismo email, lanzar una excepción
      throw new HttpException(
        `User with email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Crear un nuevo usuario utilizando el modelo y los datos recibidos
    const newUser = new this.userModel(createUserDto);
    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();
    // Retornar un mensaje de éxito junto con el usuario creado
    return {
      message: 'User created successfully',
      user: savedUser,
    };
  }

  // Método para encontrar todos los usuarios
  async findAll(): Promise<User[]> {
    // Encontrar todos los usuarios en la base de datos y retornarlos
    return this.userModel.find().exec();
  }

  // Método para encontrar un usuario por su ID
  async findOne(id: string): Promise<User> {
    // Encontrar un usuario por su ID en la base de datos
    const user = await this.userModel.findById(id).exec();
    // Si no se encuentra el usuario, lanzar una excepción de "no encontrado"
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // Retornar el usuario encontrado
    return user;
  }

  // Método para encontrar un usuario por su email
  async findOneByEmail(email: string): Promise<User | null> {
    // Encontrar un usuario por su email en la base de datos y retornarlo
    return this.userModel.findOne({ email }).exec();
  }

  // Método para encontrar un usuario por su email
  async findUserByEmail(email: string): Promise<User | null> {
    // Encontrar un usuario por su email en la base de datos y retornarlo
    return this.userModel.findOne({ email }).exec();
  }

  // Método para actualizar un usuario
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    // Actualizar un usuario por su ID con los datos recibidos y retornar el usuario actualizado
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    // Si no se encuentra el usuario, lanzar una excepción de "no encontrado"
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // Retornar un mensaje de éxito junto con el usuario actualizado
    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  }

  // Método para eliminar un usuario por su ID
  async remove(id: string): Promise<{ message: string }> {
    // Eliminar un usuario por su ID de la base de datos
    const user = await this.userModel.findByIdAndDelete(id).exec();
    // Si no se encuentra el usuario, lanzar una excepción de "no encontrado"
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // Retornar un mensaje de éxito
    return {
      message: 'User deleted successfully',
    };
  }
}
