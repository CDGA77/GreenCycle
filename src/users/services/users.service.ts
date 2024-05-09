import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/index';

@Injectable()
export class UsersService {
  private readonly users: any[] = []; // Array simulado de usuarios. Debes reemplazarlo con la lógica de tu base de datos.

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const newUser = { id: Math.random().toString(), ...createUserDto }; // Genera un ID único simulado.
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
      return this.users[index];
    }
    return null; // Opcional: podrías lanzar una excepción si el usuario no se encuentra.
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const removedUser = this.users.splice(index, 1);
      return removedUser;
    }
    return null; // Opcional: podrías lanzar una excepción si el usuario no se encuentra.
  }
}
