import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: UsersService
    ) { }


    async refreshTokens(oldRefreshToken: string) {
        try {

            const payload: { userId: string } = await this.jwtService.verifyAsync(oldRefreshToken, { secret: this.configService.get("jwt.refreshSecret") })
            const userId = payload.userId

            const user = await this.userService.findOne(Number(userId))

            if (user.currentRefreshToken !== oldRefreshToken) {
                throw new UnauthorizedException("invalid refresh token")
            }

            const accessToken = this.jwtService.sign({ userId }, { secret: this.configService.get('jwt.secret'), expiresIn: '60s' })
            const refreshToken = this.jwtService.sign({ userId }, { secret: this.configService.get('jwt.refreshSecret'), expiresIn: '30d' })
            this.userService.setCurrentRefreshToken(Number(userId), refreshToken);

            return {
                accessToken,
                refreshToken,
            }
        }
        catch (e) {
            throw new UnauthorizedException("invalid refresh token")
        }
    }


}
