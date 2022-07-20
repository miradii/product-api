import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {

  }

  async create(createProductDto: CreateProductDto) {
    return await this.prismaService.product.create(
      { data: createProductDto }
    );
  }

  async findAll() {
    return await this.prismaService.product.findMany()
  }

  async findAllByCategory(categoryId: number) {
    return await this.prismaService.product.findMany({ where: { category_id: categoryId } })
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({ where: { id } })
    if (!product)
      throw new HttpException("that product does not exist", HttpStatus.NOT_FOUND);
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({ data: updateProductDto, where: { id } })
  }

  remove(id: string) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
