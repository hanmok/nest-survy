import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'email',
    example: 'hanmok@gmail.com',
  })
  @IsEmail()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
