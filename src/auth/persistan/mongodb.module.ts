import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MONGO_DB_CONNECTION } from './mongodb.constants';
import { MongodbService } from './mongodb.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(MONGO_DB_CONNECTION),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MongodbService],
  exports: [MongodbService],
})
export class MongodbModule {}
