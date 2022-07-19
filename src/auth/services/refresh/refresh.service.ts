import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class RefreshService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }


    async refreshTokens(oldRefreshToken: string) {
        try {
            const payload: { userId: string } = await this.jwtService.verifyAsync(oldRefreshToken, { secret: this.configService.get("jwt.refreshSecret") })
            const userId = payload.userId
            return {
                accessToken: this.jwtService.sign({ userId }, { secret: this.configService.get('jwt.secret'), expiresIn: '60s' }),
                refreshToken: this.jwtService.sign({ userId }, { secret: this.configService.get('jwt.refreshSecret'), expiresIn: '30d' })
            }
        }
        catch (e) {
            throw new UnauthorizedException("refresh token expired")
        }
    }


}
