import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Post title'
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Post content'
  })
  content?: string;

  @IsEmail()
  @ApiProperty({
    description: 'Post author email'
  })
  authorEmail: string;
}
