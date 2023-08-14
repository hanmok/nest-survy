import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SurveyDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  numOfParticipation: number;

  @ApiProperty()
  @Expose()
  participationGoal: number;

  @ApiProperty()
  @Expose()
  reward_range: string;

  @Transform(({ value }) => value % 2 !== 0)
  @ApiProperty()
  @Expose()
  is_completed: boolean; // 이거.. boolean 으로 바꿔야 하는거 아니야? 음..

  @ApiProperty()
  @Expose()
  code: string;
}
