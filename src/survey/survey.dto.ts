import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SurveyDto {
  // constructor(partial: Partial<SurveyDto>) {
  //   this.participationGoal = 100;
  //   Object.assign(this, partial);
  // }
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @Transform(({ value }) => value === 1)
  @ApiProperty()
  @Expose()
  is_completed: boolean; // 이거.. boolean 으로 바꿔야 하는거 아니야? 음..

  @ApiProperty()
  @Expose()
  code: string;

  // 정상적으로 안되는중.
  @Transform(({ value }) => value === 1)
  @ApiProperty()
  @Expose()
  is_public: boolean;

  @ApiProperty()
  @Expose()
  current_participation: number;

  @ApiProperty()
  @Expose()
  participation_goal: number;

  @ApiProperty()
  @Expose()
  reward_range: string;

  @ApiProperty()
  @Expose()
  initial_section_id: number | undefined;
}
