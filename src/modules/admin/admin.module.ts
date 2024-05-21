import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { Admin, AdminSchema } from './entities/admin.entity';

@Module({
  imports: [
    // Importa el módulo MongooseModule para la integración con MongoDB
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]), // Define el esquema de Mongoose para el modelo de Admin
  ],
  controllers: [AdminController], // Declara los controladores que pertenecen a este módulo
  providers: [AdminService], // Declara los servicios que pertenecen a este módulo
  exports: [AdminService], // Exporta el servicio AdminService para su uso en otros módulos
})
export class AdminModule {} // Define y exporta el módulo AdminModule
