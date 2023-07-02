import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiResponse({
    status: 409, description: 'Duplicated email'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 404, description: 'User not found'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @ApiResponse({
    status: 409, description: 'Duplicated email'
  })
  @ApiResponse({
    status: 404, description: 'User not found'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 404, description: 'User not found'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
