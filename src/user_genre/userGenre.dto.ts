import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserGenreDTO {
  @ApiProperty()
  @Expose()
  user_id: number; // fk

  @ApiProperty()
  @Expose()
  genre_id: number; //fk
}
