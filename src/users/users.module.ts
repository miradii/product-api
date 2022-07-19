import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule, ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, ConfigService],
})
export class UsersModule { }
