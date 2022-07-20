import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogoutService } from 'src/auth/services/logout/logout.service';

@ApiTags("Auth")
@Controller('logout')
export class LogoutController {
    constructor(private readonly logoutService: LogoutService) {

    }

    @Get(":id")
    logout(@Param('id', ParseIntPipe) id: number) {
        return this.logoutService.logoutUser(id)
    }
}
