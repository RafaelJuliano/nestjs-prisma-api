import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 404, description: 'Author not found'
  })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 404, description: 'Post not found'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiResponse({
    status: 404, description: 'Post/Author not found'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiResponse({
    status: 404, description: 'Author not found'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
