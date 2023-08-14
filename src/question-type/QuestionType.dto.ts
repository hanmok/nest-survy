import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionTypeDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  description: string;
}
