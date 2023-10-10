import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SelectableOptionDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  question_id: number; // fk

  @ApiProperty()
  @Expose()
  position: number;

  @ApiProperty()
  @Expose()
  value: string;

  @ApiProperty()
  @Expose()
  is_extra: number;
}
