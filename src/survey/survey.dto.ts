import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import logObject from 'src/util/logObject';
import { convertToKoreanDate } from 'src/date';

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

  // @ApiProperty()
  // @Expose()
  // reward_range: string;
  @ApiProperty()
  @Expose()
  reward: number;

  @ApiProperty()
  @Expose()
  cost: number;

  // @ApiProperty()
  // @Expose()
  // initial_section_id: number | undefined;

  // @ApiProperty()
  // @Expose()
  // geo_code: number;

  @ApiProperty()
  @Expose()
  target_min_age: number;

  @ApiProperty()
  @Expose()
  target_max_age: number;

  @ApiProperty()
  @Expose()
  expected_time_in_sec: number;

  @ApiProperty()
  @Expose()
  is_target_male: number;

  @ApiProperty()
  @Expose()
  num_of_sections: number;

  @IsDate()
  // @Transform((value: Date) => value.toISOString())
  @Transform((params: TransformFnParams) => {
    if (params.value instanceof Date) {
      const date: Date = params.value;
      const result = convertToKoreanDate(date);
      console.log('result', result);
      return result;
    }
    return params.value;
  })
  created_at: Date;
}
