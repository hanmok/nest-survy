import { Body, Controller, Post } from '@nestjs/common';
import { SurveyGenreService } from './survey_genre.service';
import { SurveyGenreDTO } from './survey_genre.dto';
import { ApiTags } from '@nestjs/swagger';
import { SuccessAPIResponse } from 'src/api-response.model';

@ApiTags('SurveyGenre')
@Controller('survey-genre')
export class SurveyGenreController {
	constructor(private surveyGenreService: SurveyGenreService) {}

	@Post()
	async create(@Body() body: SurveyGenreDTO) {
		const ret = await this.surveyGenreService.create(body.survey_id, body.genre_id)
		return SuccessAPIResponse(ret, 201)
	}
}
