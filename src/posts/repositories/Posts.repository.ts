import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';


@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.prisma.post.create({
      data: createPostDto
    })
  }

  findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany()
  }

  findOne(id: number): Promise<PostEntity> {
    return this.prisma.post.findUnique({
      where: {
        id
      }
    })
  }

  update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.prisma.post.update({
      where: {
        id
      },
      data: updatePostDto
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
