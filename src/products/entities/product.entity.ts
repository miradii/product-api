import { Prisma, Product } from ".prisma/client"
import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"

export class ProductEntity implements Product {

    @ApiProperty({ description: "database genreated id of the user" })
    id: string

    @ApiProperty({ required: true, description: "a product name" })
    name: string

    @ApiProperty({ required: true, description: "a short description for the product" })
    description: string

    @Transform(({ value }) => value.toNumber())
    @ApiProperty({ type: Number })
    @ApiProperty({ required: true, description: "product price" })
    price: Prisma.Decimal

    @ApiProperty({ required: true, description: "id of the owner category" })
    category_id: number

    constructor(partial: Partial<ProductEntity>) {
        Object.assign(this, partial);
    }
}
