import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dataConfig from './database-config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dataConfig>) => {
        const { db, env } = configService;
        const uriDb =
          env === process.env.ENVIROMENT
            ? `${db.connection}${db.host}/${db.name}`
            : `mongodb+srv://${db.user}:${db.password}@greencycle.r003u52.mongodb.net/${db.name}?retryWrites=true&w=majority`;
        return {
          uri: uriDb,
        };
      },
      inject: [dataConfig.KEY],
    }),
  ],
})
export class PersistenceModule {}
