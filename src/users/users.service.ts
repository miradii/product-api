import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as pass from "../utils/passwordUtils"

@Injectable()
export class UsersService {
  constructor(private readonly repository: PrismaService) {

  }
  async create(createUserDto: CreateUserDto) {

    pass.hashPassword(createUserDto.password).then(newPass => createUserDto.password = newPass)

    return await this.repository.user.create({ data: createUserDto })
  }

  findAll() {
    return this.repository.user.findMany();
  }

  findOne(id: number) {
    return this.repository.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {

    return this.repository.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {

      pass.hashPassword(updateUserDto.password).then(newPass => updateUserDto.password = newPass)
    }
    return this.repository.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.repository.user.delete({ where: { id } });
  }
}