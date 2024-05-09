import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AdminModule, UsersModule],
})
export class AppModule {}
