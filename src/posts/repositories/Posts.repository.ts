import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';
import { NotFoundError } from 'src/common/errors/NotFoundError';


@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { authorEmail, ...postDto } = createPostDto

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail
      }
    })

    if (!user) {
      throw new NotFoundError('Author not found')
    }

    const data: Prisma.PostCreateInput = {
      ...postDto,
      author: {
        connect: {
          email: authorEmail
        }
      }
    }

    return this.prisma.post.create({ data })
  }

  findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true
          }
        }
      }
    })
  }

  findOne(id: number): Promise<PostEntity> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true
      }
    })
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { authorEmail, ...postDto } = updatePostDto

    if (!authorEmail) {
      return this.prisma.post.update({
        where: { id },
        data: updatePostDto
      })
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail
      }
    })

    if (!user) {
      throw new NotFoundError('Author not found')
    }

    const data: Prisma.PostUpdateInput = {
      ...postDto,
      author: {
        connect: {
          email: authorEmail
        }
      }
    }

    return this.prisma.post.update({
      where: { id },
      data
    })
  }

  remove(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: {
        id
      }
    })
  }
}
