import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GenreDto {
  @ApiProperty({ example: 'workout' })
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  id: number;
}
