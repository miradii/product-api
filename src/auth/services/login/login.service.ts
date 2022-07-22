import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/auth/dtos/loginUser.dto';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/passwordUtils';

@Injectable()
export class LoginService {

    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {

    }
    async findAuthenticatedUserById(id: number) {
        return await this.userService.findOne(id)
    }


    async loginUser(loginCandidate: LoginUserDto) {
        let user = await this.userService.findByEmail(loginCandidate.email)
        if (!user) {
            throw new HttpException("that email is not registered", HttpStatus.NOT_FOUND)
        }

        // compaer password returns a promise
        const passwordValid = await comparePassword(loginCandidate.password, user.password)
        if (!passwordValid) {
            throw new UnauthorizedException("Invalid Password")
        }

        const accessToken = this.jwtService.sign({ userId: user.id }, { secret: this.configService.get('jwt.secret'), expiresIn: '30s' })
        const refreshToken = this.jwtService.sign({ userId: user.id }, { secret: this.configService.get('jwt.refreshSecret'), expiresIn: '30d' })
        await this.userService.setCurrentRefreshToken(user.id, refreshToken);

        return {
            accessToken,
            refreshToken,
        }



    }


}
