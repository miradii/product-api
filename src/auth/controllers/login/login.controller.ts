import { Body, Controller, Get, Post, Req, UseGuards, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExtractJwt } from 'passport-jwt';
import { LoginUserDto } from 'src/auth/dtos/loginUser.dto';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { LoginEntity } from 'src/auth/entities/login.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { LoginService } from 'src/auth/services/login/login.service';

@ApiTags("Auth")
@Controller('login')
export class LoginController {
    constructor(
        private readonly loginService: LoginService,
        private readonly jwtService: JwtService
    ) {

    }

    @Post("")
    @ApiOperation({ description: "Get jwt access token and refresh token for an authenticated user" })
    @ApiCreatedResponse({ type: AuthEntity })
    async login(@Body() loginCandidate: LoginUserDto) {
        return await this.loginService.loginUser(loginCandidate)
    }
    @Get("/me")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: "Get The Authenticated user" })
    @ApiBearerAuth()
    @ApiOkResponse({ type: LoginEntity })
    async findAuthenticatedUser(@Req() req: Request) {

        console.log(req.headers['authorization'])


        const jwt = req.headers['authorization'].split(" ")[1]
        const payload = this.jwtService.decode(jwt)

        const user = await this.loginService.findAuthenticatedUserById(Number(payload['userId']))
        return new LoginEntity(user);
    }


}
