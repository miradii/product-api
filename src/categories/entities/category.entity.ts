import { Category } from ".prisma/client";
import { ApiProperty } from "@nestjs/swagger";

// this is the response type
export class CategoryEntity implements Category {

    @ApiProperty({ description: "the database generate id for the category.will bes used in adding products" })
    id: number;


    @ApiProperty({ description: "name of the category" })
    name: string;

    constructor(partial: Partial<CategoryEntity>) {
        Object.assign(this, partial);
    }

}
