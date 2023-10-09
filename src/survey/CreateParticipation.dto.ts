import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipationDTO {
  @ApiProperty()
  @Expose()
  survey_id: number;

  // @ApiProperty()
  // @Expose()
  // section_ids: number[];

  @ApiProperty()
  @Expose()
  user_id: number;
}
