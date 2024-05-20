import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import dataConfig from './persistance/database-config';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';
import { PersistenceModule } from './persistance/persistence.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dataConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    AuthModule,
    AdminModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
