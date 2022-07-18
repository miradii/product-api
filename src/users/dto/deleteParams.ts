import { IsEmail } from "class-validator";

export class UniqueUserParams {
    @IsEmail()
    email: string;
}
