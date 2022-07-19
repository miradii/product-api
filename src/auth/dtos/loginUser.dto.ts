import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {

    @IsEmail()
    @IsNotEmpty({ message: "email cannot be empty" })
    @MaxLength(50)
    @ApiProperty({
        required: true,
        maxLength: 100,
        description: "user's email address"
    })
    email: string

    @MinLength(6, { message: "the minimum length for password is 6" })
    @MaxLength(100)
    @IsNotEmpty({ message: "password cannot be empty" })
    @ApiProperty({ description: "user's password", required: true, minLength: 6, maxLength: 100 })
    password: string

}
