import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dataConfig from './persistance/database-config';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';
import { PersistenceModule } from './persistance/persistence.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Configuración del módulo de configuración global
    ConfigModule.forRoot({
      envFilePath: '.env', // Ruta del archivo de variables de entorno
      load: [dataConfig], // Función para cargar la configuración de la base de datos
      isGlobal: true, // Hacer que el módulo de configuración sea global
    }),
    // Importación de otros módulos de la aplicación
    PersistenceModule, // Módulo de persistencia (base de datos)
    AuthModule, // Módulo de autenticación
    AdminModule, // Módulo de administración
    UsersModule, // Módulo de usuarios
  ],
  controllers: [], // No se definen controladores a nivel del AppModule
  providers: [], // No se definen proveedores a nivel del AppModule
})
export class AppModule {}
