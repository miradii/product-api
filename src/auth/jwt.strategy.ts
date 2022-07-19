import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private auth: AuthService, private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("jwt.secret"),
            ignoreExpiration: false,
        });
    }

    async validate(payload: { userId: number }) {
        const user = await this.auth.validateUser(payload.userId)
        return user;
    }

}
