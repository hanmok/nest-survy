import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PostingDTO {
  @ApiProperty()
  @Expose()
  survey_id: number;

  @ApiProperty()
  @Expose()
  user_id: number;
}
