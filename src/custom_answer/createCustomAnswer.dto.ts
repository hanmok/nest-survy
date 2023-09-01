import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCustomAnswerDto {
  @ApiProperty()
  @IsNumber()
  selectable_option_id: number;

  @ApiProperty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsNumber()
  sequence: number;

  @ApiProperty()
  @IsString()
  answer_text: string;
}
