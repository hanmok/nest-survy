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
  expected_time_in_sec: number;

  @ApiProperty()
  @Expose()
  sequence: number;
  // @ApiPropertyOptional()
  // @Expose()
  // reward: number;
}
