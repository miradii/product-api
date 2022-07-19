import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsNotEmpty } from "class-validator";

export class RefreshDto {
    @IsNotEmpty()
    @IsJWT()
    @ApiProperty()
    refreshToken: string
}
