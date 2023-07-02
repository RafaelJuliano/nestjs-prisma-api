import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User Email'
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User name'
  })
  name: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Define if user is an administrator',
    default: false
  })
  admin: boolean;
}
