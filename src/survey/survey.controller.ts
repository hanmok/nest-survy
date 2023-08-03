import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SurveyDto } from './survey.dto';
import { SurveyService } from './survey.service';
import { CreateSurveyDTO } from './create-survey.dto';

@Controller('/survey')
@Serialize(SurveyDto)
export class SurveyController {
	constructor(private surveyService: SurveyService) {}

	@Post('/create')
	async createSurvey(@Body() body: CreateSurveyDTO) {
		const survey = await this.surveyService.create(body.title, body.participationGoal)
		return survey
	}

	@Get()
	async getAllSurveys() {
		return this.surveyService.getAll()
	}

	@Get('/:id')
	async getSurveyById(@Param('id') id: string) {
		// return this.surveyService.findOne(parseInt(id))
		const survey = await this.surveyService.findOne(parseInt(id))
		if (!survey) { 
			throw new NotFoundException('survey not found')
		}
		return survey
	}

	@Get('/:survey_id/posted-user')
	async getPostedUserBySurveyId(@Param('survey_id') survey_id: string) {}

	@Get('/:survey_id/participated-users')
	async getParticipatedUserBySurveyId(@Param('survey_id') survey_id: string) {}

	@Get('/:survey_id/genres')
	async getGenresBySurveyId(@Param('survey_id') survey_id: string) {}

	@Post('/genres')
	async createSurveyGenre() {}
}
