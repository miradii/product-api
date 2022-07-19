import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/auth/dtos/loginUser.dto';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/passwordUtils';

@ApiTags("Auth")
@Controller('login')
export class LoginController {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {

    }

    @Post("")
    async login(@Body() loginCandidate: LoginUserDto) {
        // check if user exists
        let user = await this.userService.findByEmail(loginCandidate.email)
        if (!user) {
            throw new HttpException("that email is not registered", HttpStatus.NOT_FOUND)
        }

        // compaer password returns a promise
        const passwordValid = await comparePassword(loginCandidate.password, user.password)
        if (!passwordValid) {
            throw new UnauthorizedException("Invalid Password")
        }

        return {
            accessToken: this.jwtService.sign({ userId: user.id }, { secret: this.configService.get('jwt.secret'), expiresIn: '60s' }),
            refreshToken: this.jwtService.sign({ userId: user.id }, { secret: this.configService.get('jwt.refreshSecret'), expiresIn: '30d' })
        }


    }
}
