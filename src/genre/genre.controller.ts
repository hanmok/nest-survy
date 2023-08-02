import { Controller, Get, Post } from '@nestjs/common';

@Controller('genre')
export class GenreController {

	@Get()
	async getAllGenres() {}

	@Post()
	async createGenre() {}

	@Get('/:id')
	async getGenreById() {}

	@Get('/:genre_id/users') 
	async getUsersByGenreId() {}

	@Get('/:genre_id/surveys')
	async getSurveysByGenreId() {}

	@Post('/:genre_id/surveys/:survey_id')
	async createSurveyGenre() {}
	
}
