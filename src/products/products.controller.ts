import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiOperation({ description: "Create a product" })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return new ProductEntity(await this.productsService.create(createProductDto));
  }


  @ApiOperation({ description: "Get the list of all products" })
  @ApiOkResponse({ description: "returns all of the products", type: [ProductEntity] })
  @Get()
  async findAll() {
    return (await this.productsService.findAll()).map(prod => new ProductEntity(prod));
  }

  @ApiOperation({ description: "Get a product by Id" })
  @ApiOkResponse({ type: ProductEntity })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ProductEntity(await this.productsService.findOne(id));
  }

  @ApiOperation({ description: "Get all products in the specified category" })
  @ApiOkResponse({ type: [ProductEntity] })
  @Get('/category/:id')
  async findAllByCategory(@Param('id', ParseIntPipe) id: number) {
    return (await this.productsService.findAllByCategory(id)).map(prod => new ProductEntity(prod));
  }

  @ApiOperation({ description: "Update the product with the specified id" })
  @ApiOkResponse({ type: ProductEntity })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return new ProductEntity(await this.productsService.update(id, updateProductDto));
  }


  @ApiOperation({ description: "Delete the product with the specified id" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
