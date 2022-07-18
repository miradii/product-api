import { Module } from '@nestjs/common';
import { LoginService } from './services/login/login.service';
import { SignupController } from './controllers/signup/signup.controller';
import { LoginController } from './controllers/login/login.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { SignUpService } from './services/signup/signup.service';

@Module({
  imports: [UsersModule],
  controllers: [SignupController, LoginController],
  providers: [LoginService, SignUpService, UsersService]
})
export class AuthModule { }
