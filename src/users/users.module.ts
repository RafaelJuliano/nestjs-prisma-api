import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from './repositories/User.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository]
})
export class UsersModule { }
