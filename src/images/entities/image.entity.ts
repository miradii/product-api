import { Image } from ".prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, isURL } from "class-validator";

export class ImageEntity implements Image {

    id: string;
    @ApiProperty({ required: true, description: "image url" })
    url: string;
    @ApiProperty({ required: true, description: "the id for the owner of the image" })
    product_id: string;

    @IsBoolean()
    @ApiProperty({ required: false, description: "it's the main image if true" })
    preview: boolean;
}
