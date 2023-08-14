import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSectionDTO {
  @ApiProperty()
  @IsNumber()
  survey_id: number;

  @ApiPropertyOptional({ description: 'section title' })
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  expectedTimeInSec: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  reward: number;
}
