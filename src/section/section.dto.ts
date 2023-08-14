import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SectionDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  survey_id: number;

  @ApiProperty()
  @Expose()
  title: string = '';

  @ApiPropertyOptional()
  @Expose()
  expectedTimeInSec: number;

  @ApiPropertyOptional()
  @Expose()
  reward: number;
}
