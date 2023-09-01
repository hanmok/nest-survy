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
  selectable_option_id: number; // fk

  @ApiProperty()
  @Expose()
  user_id: number; // fk

  @ApiPropertyOptional()
  @Expose()
  answer_text: string; // fk

  //   @ApiProperty()
  @ApiPropertyOptional()
  @Expose()
  time_took_in_sec: number;
}
