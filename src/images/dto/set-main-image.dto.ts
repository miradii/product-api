import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class SetMainImageDto {

    @IsNotEmpty({ message: "no id was sent" })
    @ApiProperty({ required: true })
    id: string

    @IsNotEmpty({ message: "no productId was sent" })
    @ApiProperty({ required: true })
    product_id: string

}
