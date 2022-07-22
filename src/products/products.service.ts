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
    return await this.prismaService.product.findMany({ include: { Image: true } })
  }

  async findAllByCategory(categoryId: number) {
    return await this.prismaService.product.findMany({ where: { category_id: categoryId }, include: { Image: true } })
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({ where: { id }, include: { Image: true } })
    if (!product)
      throw new HttpException("that product does not exist", HttpStatus.NOT_FOUND);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.prismaService.product.update({ data: updateProductDto, where: { id }, include: { Image: true } })
  }

  async remove(id: string) {
    return await this.prismaService.product.delete({ where: { id } });
  }
}
