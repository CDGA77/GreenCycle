import { Injectable } from '@nestjs/common';
import { CreateAdminDto, UpdateAdminDto } from '../dto/index';

@Injectable()
export class AdminService {
  private readonly admins: any[] = []; // Array simulado de administradores. Debes reemplazarlo con la lógica de tu base de datos.

  findAll() {
    return this.admins;
  }

  findOne(id: string) {
    return this.admins.find((admin) => admin.id === id);
  }

  create(createAdminDto: CreateAdminDto) {
    const newAdmin = { id: Math.random().toString(), ...createAdminDto }; // Genera un ID único simulado.
    this.admins.push(newAdmin);
    return newAdmin;
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    const index = this.admins.findIndex((admin) => admin.id === id);
    if (index !== -1) {
      this.admins[index] = { ...this.admins[index], ...updateAdminDto };
      return this.admins[index];
    }
    return null; // Opcional: podrías lanzar una excepción si el administrador no se encuentra.
  }

  remove(id: string) {
    const index = this.admins.findIndex((admin) => admin.id === id);
    if (index !== -1) {
      const removedAdmin = this.admins.splice(index, 1);
      return removedAdmin;
    }
    return null; // Opcional: podrías lanzar una excepción si el administrador no se encuentra.
  }
}
