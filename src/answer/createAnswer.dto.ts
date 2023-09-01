import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAnswerDTO {
  @ApiProperty()
  @IsNumber()
  // question_id: number;
  question_id: number;

  @ApiProperty()
  @IsNumber()
  // survey_id: number;
  survey_id: number;

  @ApiProperty()
  @IsNumber()
  // selectableOption_id: number;
  selectable_option_id: number;

  @ApiProperty()
  @IsNumber()
  // user_id: number;
  user_id: number;

  //   @ApiProperty({ example: 'my name is someone' })
  @ApiPropertyOptional({ example: 'my name is someone' })
  @IsString()
  @IsOptional()
  answer_text: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  time_took_in_sec: number;
}
