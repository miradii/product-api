import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';



@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {

  }
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prismaService.category.create({ data: createCategoryDto })
  }

  async findAll() {
    return await this.prismaService.category.findMany()
  }

  async findOne(id: number) {
    const category = await this.prismaService.category.findUnique({ where: { id } })
    if (!category) {
      throw new HttpException("category not fouunct", HttpStatus.NOT_FOUND)
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.prismaService.category.update({ where: { id: id }, data: updateCategoryDto });
  }

  async remove(id: number) {
    const productCount = await this.prismaService.product.count({ where: { category_id: id } })
    if (productCount > 0) {
      throw new HttpException("Can't Delete non-empty Category", HttpStatus.CONFLICT)
    }
    return await this.prismaService.category.delete({ where: { id } });
  }
}
