import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateImageDto {

    @IsNotEmpty({ message: "no url was sent" })
    @ApiProperty({ required: true })
    url: string

    @IsNotEmpty({ message: "no productId was sent" })
    @ApiProperty({ required: true })
    product_id: string

    @IsNotEmpty()
    @ApiProperty()
    preview?: string

}
