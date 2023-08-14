import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AnswerDTO {
  @ApiProperty()
  @Expose()
  question_id: number; // fk

  @ApiProperty()
  @Expose()
  survey_id: number; // fk

  @ApiProperty()
  @Expose()
  selectableOption_id: number; // fk

  @ApiProperty()
  @Expose()
  user_id: number; // fk

  @ApiPropertyOptional()
  @Expose()
  answerText: string; // fk

  //   @ApiProperty()
  @ApiPropertyOptional()
  @Expose()
  timeTookInSec: number;
}
