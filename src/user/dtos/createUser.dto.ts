import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'email',
    example: 'testadd@gmail.com',
  })
  @IsEmail()
  username: string;

  @ApiProperty({ example: 'testadd' })
  @IsString()
  password: string;
}
