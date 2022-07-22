import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UniqueUserParams } from './dto/uniqueUserParams';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ExtractJwt } from 'passport-jwt';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(JwtAuthGuard)

  @ApiOperation({ description: "Create new user" })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: "user created succesfully", type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "Get all the users" })
  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserEntity] })
  async findAll() {
    let users = await this.usersService.findAll()
    return users.map(user => new UserEntity(user));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "Get a user by id" })
  @ApiBearerAuth(":id")
  @ApiParam({ name: "id", type: "int", description: "database generated user id" })
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return new UserEntity(await this.usersService.findOne(id));
  }



  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "update the user with specified id" })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: "user updated succesfully", type: UserEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "delete the user with specified id" })
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.remove(id));
  }
}
