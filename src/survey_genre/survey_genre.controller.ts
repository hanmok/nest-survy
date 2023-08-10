import { Body, Controller, Post } from '@nestjs/common';
import { SurveyGenreService } from './survey_genre.service';
import { SurveyGenreDTO } from './survey_genre.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SurveyGenre')
@Controller('survey-genre')
export class SurveyGenreController {
	constructor(private surveyGenreService: SurveyGenreService) {}

	@Post()
	async create(@Body() body: SurveyGenreDTO) {
		return await this.surveyGenreService.create(body.survey_id, body.genre_id)
	}
}
