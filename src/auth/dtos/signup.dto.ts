import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class SignUpDTO extends CreateUserDto {


    @IsNotEmpty({ message: "please confirm your password" })
    @ApiProperty({ required: true, minLength: 6, maxLength: 100 })
    confirmPassword: string
}
