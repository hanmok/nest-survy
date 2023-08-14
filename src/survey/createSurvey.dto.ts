import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSurveyDTO {
  @ApiProperty()
  @Expose()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  participationGoal: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  user_id: number;
}
