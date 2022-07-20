import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiTags("Categories")
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ApiOperation({ description: "create a new category" })
  @ApiCreatedResponse({ description: "Category Succesfully Created", type: CategoryEntity })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ description: "get all the categories" })
  @ApiOkResponse({ type: [CategoryEntity] })
  async findAll() {
    let categories = await this.categoriesService.findAll();
    return categories.map(cat => new CategoryEntity(cat));
  }

  @Get(':id')
  @ApiOperation({ description: "get the category with the spec id" })
  @ApiOkResponse({ type: [CategoryEntity] })
  @UseInterceptors(CategoryEntity)
  async findOne(@Param('id', ParseIntPipe) id: number,) {
    return new CategoryEntity(await this.categoriesService.findOne(+id));
  }

  @Patch(':id')
  @ApiOperation({ description: "update the category with the spec id" })
  @ApiCreatedResponse({ type: CategoryEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ description: "remove the category with the spec id" })
  @ApiOkResponse({ type: CategoryEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
