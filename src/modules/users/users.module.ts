import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './entities/users.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Importación del módulo Mongoose para el manejo de modelos y esquemas
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // Controladores proporcionados por este módulo
  controllers: [UsersController],
  // Servicios proporcionados por este módulo
  providers: [UsersService],
  // Exportación del servicio UsersService para su uso en otros módulos
  exports: [UsersService],
})
export class UsersModule {}
