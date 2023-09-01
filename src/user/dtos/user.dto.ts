import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({
    example: 'hanmok@gmail.com',
  })
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  collected_reward: number;

  @ApiProperty() // TODO: Date form needed
  @Expose()
  birth_date: string;

  // @Expose()
  // isMale: number;

  // @Expose()
  // @IsString()
  // registeredAt: string;
}
