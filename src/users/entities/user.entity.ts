import { User } from ".prisma/client"
import { ApiProperty } from "@nestjs/swagger"
import { Exclude } from "class-transformer"

export class UserEntity implements User {

    id: number

    @ApiProperty({ required: true, description: "users full name", minLength: 5, maxLength: 100 })
    name: string

    @ApiProperty({
        required: true,
        maxLength: 100,
        description: "A unique email address "
    })
    email: string

    @Exclude()
    @ApiProperty({ required: true, minLength: 6, maxLength: 100 })
    password: string

    @Exclude()
    currentRefreshToken: string


    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

}
