import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSectionDTO {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsNumber()
  survey_id: number;

  @ApiPropertyOptional({ description: 'section title' })
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  expected_time_in_sec: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  reward: number;
}
