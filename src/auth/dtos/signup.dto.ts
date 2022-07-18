import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class SignUpDTO extends CreateUserDto {

    @MinLength(6, { message: "the minimum length for password is 6" })
    @MaxLength(100)
    @IsNotEmpty({ message: "please confirm your password" })
    @ApiProperty({ required: true, minLength: 6, maxLength: 100 })
    confirmPassword: string
}
