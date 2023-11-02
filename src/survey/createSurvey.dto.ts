import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSurveyDTO {
  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  participation_goal: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  user_id: number;

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
  is_target_male: number;

  @ApiProperty()
  @Expose()
  genre_ids: number[]; //

  @ApiProperty()
  @Expose()
  geo_ids: number[];

  @ApiProperty()
  @Expose()
  cost: number;

  @ApiProperty()
  @Expose()
  reward: number;

  @ApiProperty()
  @Expose()
  num_of_sections: number;

  // TODO: 추가하기.
  // @Expose()
  // @IsNumber()
  // is_public: number;
}
