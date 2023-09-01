import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SectionBridgeDTO {
  @ApiProperty()
  @Expose()
  current_id: number; //fk

  @ApiProperty()
  @Expose()
  next_id: number; // fk

  @ApiProperty()
  @Expose()
  question_id: number; //fk

  @ApiPropertyOptional()
  @Expose()
  selectable_option_id: number; //fk
}
