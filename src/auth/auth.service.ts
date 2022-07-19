import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {

    }

    validateUser(userId: number) {
        return this.usersService.findOne(userId);
    }
}
