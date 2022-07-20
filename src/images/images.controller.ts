import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { SetMainImageDto } from './dto/set-main-image.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Images")
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  // @Post()
  // create(@Body() createImageDto: CreateImageDto) {
  //   return this.imagesService.create(createImageDto);
  // }

  @Get("/url")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()


  @ApiOperation({ description: "get a url for uploading one image" })
  async signeUrl() {
    return await this.imagesService.getUrl();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "add the url of uploaded image" })
  @ApiBearerAuth()
  @Post("")
  async createImage(@Body() createImageDto: CreateImageDto) {
    return await this.imagesService.addImage(createImageDto)
  }


  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "set the image specified in the body as the main image for product" })
  @ApiBearerAuth()
  @Put('/main/')
  findOne(@Body() setMainDto: SetMainImageDto) {
    return this.imagesService.setImageAsMain(setMainDto.id, setMainDto.product_id)
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }
}
