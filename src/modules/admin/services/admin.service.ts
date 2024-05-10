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

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { email } = createAdminDto;
    const existingAdmin = await this.findAdminByEmail(email);

    if (existingAdmin) {
      throw new HttpException(
        `Admin with email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newAdmin = new this.adminModel(createAdminDto);
    return newAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findOne(id: string): Promise<Admin> {
    const user = await this.adminModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ email }).exec();
  }

  async findAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateAdminDto): Promise<Admin> {
    const updatedUser = await this.adminModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const admin = await this.adminModel.findByIdAndDelete(id).exec();
    if (!admin) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
