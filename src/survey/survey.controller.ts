import { Controller, Get, Post } from '@nestjs/common';

@Controller('/survey')
export class SurveyController {

	@Post('/create')
	async createSurvey() {}

	@Get()
	async getAllSurveys() {}

	@Get('/:id')
	async getSurveyById() {}

	@Get('/:survey_id/posted-user')
	async getPostedUserBySurveyId() {}

	@Get('/:survey_id/participated-users')
	async getParticipatedUserBySurveyId() {}

	@Get('/:survey_id/genres')
	async getGenresBySurveyId() {}

	@Post('/genres')
	async createSurveyGenre() {}
}
