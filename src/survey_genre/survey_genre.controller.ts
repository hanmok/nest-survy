import { Body, Controller, Get, Post } from '@nestjs/common';
import { SurveyGenreService } from './survey_genre.service';
import { SurveyGenreDTO } from './survey_genre.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from 'src/api-response.model';

import { SuccessAPIResponse } from 'src/util/success-api-response';

@ApiTags('SurveyGenre')
@Controller('survey-genre')
export class SurveyGenreController {
  constructor(private surveyGenreService: SurveyGenreService) {}

  @ApiOperation({ summary: 'Get all Survey_genre' })
  @Get()
  async fetchAll() {
    const ret = await this.surveyGenreService.getAllSurveyGenres();
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Create Survey_genre' })
  @Post()
  async create(@Body() body: SurveyGenreDTO) {
    const ret = await this.surveyGenreService.create(
      body.survey_id,
      body.genre_id,
    );
    return SuccessAPIResponse(ret, 201);
  }
}
