import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResponseDTO {
  @ApiProperty()
  @IsNumber()
  question_id: number;

  @ApiProperty()
  @IsNumber()
  survey_id: number;

  @ApiProperty()
  @IsNumber()
  selectableOption_id: number;

  @ApiProperty()
  @IsNumber()
  user_id: number;

  //   @ApiProperty({ example: 'my name is someone' })
  @ApiPropertyOptional({ example: 'my name is someone' })
  @IsString()
  @IsOptional()
  answerText: string;

  @ApiPropertyOptional()
  @IsNumber()
  timeTookInSec: number;
}
