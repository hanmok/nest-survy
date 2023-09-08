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

  // TODO: 추가하기.
  // @Expose()
  // @IsNumber()
  // is_public: number;
}
