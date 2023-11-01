import { ApiProperty } from '@nestjs/swagger';

export class SurveyGeoDto {
  @ApiProperty()
  survey_id: number;

  @ApiProperty()
  geo_id: number;
}
