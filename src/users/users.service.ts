import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/User.repository';
import { NotFoundError } from '../common/errors/NotFoundError';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private readonly repository: UsersRepository) { }

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto)
  }

  findAll() {
    return this.repository.findAll()
  }

  async findOne(id: number) {
    return this.getUserOrFail(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.getUserOrFail(id)
    return this.repository.update(id, updateUserDto)
  }

  async remove(id: number) {
    await this.getUserOrFail(id)
    return this.repository.remove(id)
  }

  private async getUserOrFail(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }
}
