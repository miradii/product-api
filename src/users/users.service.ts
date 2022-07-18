import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository: PrismaService) {

  }
  async create(createUserDto: CreateUserDto) {
    return await this.repository.user.create({ data: createUserDto })
  }

  findAll() {
    return this.repository.user.findMany();
  }

  findOne(id: number) {
    return this.repository.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.repository.user.delete({ where: { id } });
  }
}
