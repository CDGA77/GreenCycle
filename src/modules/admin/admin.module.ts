import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './services/admin.service';
import { Admin, AdminSchema } from './entities/admin.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  providers: [AdminService],
  exports: [AdminService], // Si AdminService es exportado y utilizado fuera de AdminModule
})
export class AdminModule {}
