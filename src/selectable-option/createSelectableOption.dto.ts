import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, isNumber } from 'class-validator';

export class CreateSelectableOptionDTO {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsNumber()
  question_id: number; // fk

  @ApiProperty({ description: 'sequence within question, begins with 0' })
  @IsNumber()
  position: number;

  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsNumber()
  section_id: number;

  @ApiProperty()
  @IsNumber()
  is_extra: number;
}
