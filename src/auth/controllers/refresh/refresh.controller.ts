import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { RefreshDto, } from 'src/auth/dtos/refresh.dto';
import { RefreshService } from 'src/auth/services/refresh/refresh.service';

@ApiTags("Auth")
@Controller('refresh')
export class RefreshController {
    constructor(private readonly refreshService: RefreshService) {

    }

    @Post("")
    @ApiProperty()
    getRefreshToken(@Body() refreshDto: RefreshDto) {
        return this.refreshService.refreshTokens(refreshDto.refreshToken)
    }
}
