import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDTO } from 'src/auth/dtos/signup.dto';
import { SignUpService } from 'src/auth/services/signup/signup.service';
import { UserEntity } from 'src/users/entities/user.entity';

@ApiTags('Auth')
@Controller('signup')
export class SignupController {
    constructor(private readonly signupService: SignUpService) {

    }


    @Post()
    @ApiCreatedResponse({ description: "user created succesfully", type: UserEntity })
    @Post("/auth/signup")
    signup(@Body() candidate: SignUpDTO) {
        return this.signupService.signUp(candidate)
    }
}
