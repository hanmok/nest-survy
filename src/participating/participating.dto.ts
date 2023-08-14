import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ParticipatingDTO {
  @ApiProperty()
  @Expose()
  user_id: number;

  @ApiProperty()
  @Expose()
  survey_id: number;
}
