import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminDto, UpdateAdminDto } from '../dto/index';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  // Método para crear un nuevo administrador
  async createAdmin(
    createAdminDto: CreateAdminDto,
  ): Promise<{ message: string; admin: Admin }> {
    const { email } = createAdminDto;
    const existingAdmin = await this.findAdminByEmail(email);

    // Verificar si ya existe un administrador con el mismo email
    if (existingAdmin) {
      throw new HttpException(
        `Admin with email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Crear un nuevo administrador y guardarlo en la base de datos
    const newAdmin = new this.adminModel(createAdminDto);
    const savedAdmin = await newAdmin.save();
    return {
      message: 'Admin created successfully',
      admin: savedAdmin,
    };
  }

  // Método para obtener todos los administradores
  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  // Método para obtener un administrador por su ID
  async findOne(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
    return admin;
  }

  // Método para obtener un administrador por su email
  async findOneByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ email }).exec();
  }

  // Método para encontrar un administrador por su email
  async findAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ email }).exec();
  }

  // Método para actualizar un administrador existente
  async update(
    id: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise<{ message: string; admin: Admin }> {
    const updatedAdmin = await this.adminModel
      .findByIdAndUpdate(id, updateAdminDto, { new: true })
      .exec();
    if (!updatedAdmin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
    return {
      message: 'Admin updated successfully',
      admin: updatedAdmin,
    };
  }

  // Método para eliminar un administrador existente
  async remove(id: string): Promise<{ message: string }> {
    const admin = await this.adminModel.findByIdAndDelete(id).exec();
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
    return {
      message: 'Admin deleted successfully',
    };
  }
}
