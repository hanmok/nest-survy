import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateQuestionTypeDTO {
  @ApiProperty()
  @IsString()
  description: string;
}
