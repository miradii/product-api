import { ApiProperty } from "@nestjs/swagger"
import { isDecimal, IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator"

export class CreateProductDto {


    @IsNotEmpty()
    @MaxLength(80)
    @MinLength(5)
    @ApiProperty({ required: true, description: "a product name" })
    name: string

    @MaxLength(280)
    @MinLength(10)
    @ApiProperty({ required: true, description: "a short description for the product" })
    description: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true, description: "product price" })
    price: number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ required: true, description: "id of the owner category", type: 'number', })
    category_id: number
}
