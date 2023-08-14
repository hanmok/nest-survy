import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateSectionBridgeDTO {
  @ApiProperty()
  @IsNumber()
  current_id: number;

  @ApiProperty()
  @IsNumber()
  next_id: number;

  @ApiProperty()
  @IsNumber()
  question_id: number;

  @ApiPropertyOptional()
  @IsNumber()
  selectableOption_id: number;
}
