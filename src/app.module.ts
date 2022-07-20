import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ImagesModule } from './images/images.module';
import configuration from 'config/configuration';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PrismaModule, UsersModule, AuthModule, ConfigModule.forRoot({ load: [configuration] }), ImagesModule],
})
export class AppModule { }
