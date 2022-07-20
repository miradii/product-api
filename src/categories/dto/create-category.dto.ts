import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @MaxLength(80)
    @ApiProperty({ required: true, description: "unique name for the category being created" })
    name: string
}
