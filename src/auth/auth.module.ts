import { forwardRef, Module } from '@nestjs/common';
import { LoginService } from './services/login/login.service';
import { SignupController } from './controllers/signup/signup.controller';
import { LoginController } from './controllers/login/login.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { SignUpService } from './services/signup/signup.service';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-jwt';
import { JwtStrategy } from './jwt.strategy';
import { RefreshService } from './services/refresh/refresh.service';
import { RefreshController } from './controllers/refresh/refresh.controller';


@Module({
  imports: [forwardRef(() => UsersModule), PassportModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: await configService.get('jwt.secret'),
    }),
    inject: [ConfigService],
  })],
  controllers: [SignupController, LoginController, RefreshController],
  providers: [LoginService, SignUpService, UsersService, ConfigService, AuthService, RefreshService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
