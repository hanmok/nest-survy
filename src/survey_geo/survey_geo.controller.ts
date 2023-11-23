import { Body, Controller, Post } from '@nestjs/common';
import { SurveyGeoService } from './survey_geo.service';
import { SurveyGeoDto } from './survey-geo.dto';
import { ApiTags } from '@nestjs/swagger';
import { SuccessAPIResponse } from 'src/util/api-response';

@ApiTags('SurveyGeo')
@Controller('/survey-geo')
export class SurveyGeoController {
  constructor(private surveyGeoService: SurveyGeoService) {}

  @Post()
  async create(@Body() body: SurveyGeoDto) {
    const surveyGeo = await this.surveyGeoService.create(
      body.survey_id,
      body.geo_id,
    );
    return SuccessAPIResponse(surveyGeo, 201);
    // return surveyGeo;
  }
}
