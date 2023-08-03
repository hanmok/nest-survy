import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './create-genre.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GenreDto } from './genre.dto';

@Serialize(GenreDto)
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
	async getGenreById(@Param('id') id: string) {
		const genre = await this.genreService.findOne(parseInt(id))
		if (!genre) { 
			throw new NotFoundException('genre not found');
		}
		return genre;
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
