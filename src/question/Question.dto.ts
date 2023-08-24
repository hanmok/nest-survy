import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionType } from 'src/util/questionType';

export class QuestionDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  section_id: number; // fk

  @Expose()
  survey_id: number;

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

  @Expose()
  required: number;

  @Expose()
  question_type: QuestionType;
}
