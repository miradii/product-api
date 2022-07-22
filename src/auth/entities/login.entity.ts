import { UserEntity } from "src/users/entities/user.entity"

export class LoginEntity {
    user: UserEntity
    constructor(userEntity: UserEntity) {
        this.user = userEntity
    }
}
