import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty({ message: "name can not be empty" })
    @MinLength(5, { message: "that name is too short" })
    @MaxLength(100, { message: "that name is too long" })
    @ApiProperty({ required: true })
    name: string

    @IsNotEmpty({ message: "email cannot be empty" })
    @IsEmail()
    @MaxLength(50)
    @ApiProperty({
        required: true,
        maxLength: 100,
        description: "A unique email address "
    })
    email: string

    @IsNotEmpty({ message: "password cannot be empty" })
    @MinLength(6, { message: "the minimum length for password is 6" })
    @MaxLength(100)
    @ApiProperty({ required: true, minLength: 6, maxLength: 100 })
    password: string
}
