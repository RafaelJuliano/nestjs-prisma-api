import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/Posts.repository';
import { PostEntity } from './entities/post.entity';
import { NotFoundError } from '../common/errors/NotFoundError';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) { }

  async create(createPostDto: CreatePostDto) {
    return this.repository.create(createPostDto)
  }

  findAll() {
    return this.repository.findAll()
  }

  async findOne(id: number) {
    const post = await this.getPostOrFail(id)
    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.getPostOrFail(id)
    return this.repository.update(id, updatePostDto)
  }

  async remove(id: number) {
    await this.getPostOrFail(id)
    return this.repository.remove(id)
  }

  private async getPostOrFail
    (id: number): Promise<PostEntity> {
    const post = await this.repository.findOne(id)
    if (!post) {
      throw new NotFoundError('Post not found')
    }
    return post
  }
}
