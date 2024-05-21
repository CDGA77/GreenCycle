import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dataConfig from './database-config';

@Global()
@Module({
  imports: [
    // Configuración asíncrona de MongooseModule para la conexión a MongoDB
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dataConfig>) => {
        // Extraer la configuración de la base de datos y el entorno del servicio de configuración
        const { db, env } = configService;
        // Construir la URI de conexión a MongoDB
        const uriDb =
          env === process.env.ENVIROMENT
            ? `${db.connection}${db.host}/${db.name}` // URI para el entorno especificado
            : `mongodb+srv://${db.user}:${db.password}@greencycle.r003u52.mongodb.net/${db.name}?retryWrites=true&w=majority`; // URI para entornos no especificados
        // Retornar el objeto de configuración de Mongoose
        return {
          uri: uriDb,
        };
      },
      inject: [dataConfig.KEY], // Inyectar la configuración de la base de datos
    }),
  ],
})
export class PersistenceModule {}
