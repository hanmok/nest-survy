// import { QuestionType } from './../question-type/questionType.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString, isNumber } from 'class-validator';
import { QuestionType } from '../util/QuestionType';

export class CreateQuestionDTO {
  @ApiProperty()
  @IsNumber()
  section_id: number;

  @ApiProperty()
  @IsNumber()
  survey_id: number;

  @ApiProperty({ example: '0', description: 'starts from 0' })
  @IsNumber()
  position: number;

  @ApiProperty({ example: "what's your name?" })
  @IsString()
  text: string;

  //   @ApiProperty()
  @ApiPropertyOptional()
  @IsNumber()
  expected_time_in_sec: number;

  @ApiProperty()
  //   @IsString()
  @IsEnum(QuestionType)
  question_type: QuestionType;
}
