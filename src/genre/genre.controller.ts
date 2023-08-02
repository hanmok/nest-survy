import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './create-genre.dto';

@Controller('/genre')
export class GenreController {
	constructor(private genreService: GenreService) {}

	@Get()
	async getAllGenres() {
		return this.genreService.getAll()
	}

	@Post()
	async createGenre(@Body() body: CreateGenreDto) {
		console.log(body)
		const genre = await this.genreService.create(body.name)
		return genre
	}

	@Get('/:id')
	async getGenreById() {

	}

	@Get('/:genre_id/users') 
	async getUsersByGenreId() {
		
	}

	@Get('/:genre_id/surveys')
	async getSurveysByGenreId() {

	}

	@Post('/:genre_id/surveys/:survey_id')
	async createSurveyGenre() {

	}	
}
