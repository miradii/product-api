import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignUpDTO } from "../../dtos/signup.dto"

@Injectable()
export class SignUpService {
    constructor(private readonly userService: UsersService) {

    }

    async signUp(candidate: SignUpDTO) {
        if (candidate.password === candidate.confirmPassword) {
            candidate.confirmPassword = null;

            const { confirmPassword, ...newUser } = candidate

            return new UserEntity(await this.userService.create(newUser))
        }

        else {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: "the passwords do not match" }, HttpStatus.BAD_REQUEST)
        }
    }
}
