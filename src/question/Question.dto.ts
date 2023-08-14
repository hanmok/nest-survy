import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QuestionDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({ example: 14 })
  @Expose()
  questionType_id: number; // fk

  @ApiProperty()
  @Expose()
  section_id: number; // fk

  @ApiProperty({ description: 'sequence within section' })
  @Expose()
  position: number;

  @ApiProperty({ example: "what's your name?" })
  @Expose()
  text: string;

  //   @ApiProperty()
  @ApiPropertyOptional()
  @Expose()
  expectedTimeInSec: number;
}
