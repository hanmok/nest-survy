import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDTO {
  @ApiProperty({ example: 'workout' })
  @IsString()
  name: string;
}
