import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { SetMainImageDto } from './dto/set-main-image.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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

  @ApiOkResponse({ description: "a pre generated url for uploading images to arvancloud" })
  async signeUrl() {
    return await this.imagesService.getUrl();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post("")
  async createImage(@Body() createImageDto: CreateImageDto) {
    return await this.imagesService.addImage(createImageDto)
  }


  @UseGuards(JwtAuthGuard)
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
