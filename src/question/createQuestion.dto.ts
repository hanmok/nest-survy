import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString, isNumber } from 'class-validator';

export class CreateQuestionDTO {
  @ApiProperty({ example: '14' })
  @IsNumber()
  questionType_id: number;

  // questionType_id, section_id 는 어떻게 알아?

  @ApiProperty()
  @IsNumber()
  section_id: number;

  @ApiProperty({ example: '0', description: 'starts from 0' })
  @IsNumber()
  position: number;

  @ApiProperty({ example: "what's your name?" })
  @IsString()
  text: string;

  //   @ApiProperty()
  @ApiPropertyOptional()
  @IsNumber()
  expectedTimeInSec: number;
}
