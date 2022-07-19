import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LogoutService {
    constructor(private readonly userService: UsersService) {

    }

    logoutUser(id: number) {
        return this.userService.removeCurrentRefreshToken(id)
    }
}
