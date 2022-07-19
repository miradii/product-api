import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/auth/dtos/loginUser.dto';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { LoginService } from 'src/auth/services/login/login.service';

@ApiTags("Auth")
@Controller('login')
export class LoginController {
    constructor(
        private readonly loginService: LoginService
    ) {

    }

    @Post("")
    @ApiCreatedResponse({ type: AuthEntity })
    async login(@Body() loginCandidate: LoginUserDto) {
        return await this.loginService.loginUser(loginCandidate)
    }
}
