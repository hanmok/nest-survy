import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './createGenre.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GenreDto } from './genre.dto';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';
import { SurveyGenreDTO } from 'src/survey_genre/survey_genre.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Genre')
@Controller('/genre')
export class GenreController {
	constructor(
		private genreService: GenreService, 
		private surveyGenreService: SurveyGenreService) {}

	@Get()
	@Serialize(GenreDto)
	async getAllGenres() {
		return this.genreService.getAll()
	}

	@Post()
	@Serialize(GenreDto)
	async createGenre(@Body() body: CreateGenreDto) {
		console.log(body)
		const genre = await this.genreService.create(body.name)
		return genre
	}

	@Get('/:id')
	@Serialize(GenreDto)
	async getGenreById(@Param('id') id: string) {
		const genre = await this.genreService.findOne(parseInt(id))
		if (!genre) { 
			throw new NotFoundException('genre not found');
		}
		return genre;
	} 



	@Get('/:id/surveys')
	@Serialize(SurveyGenreDTO)
	async getSurveysByGenreId(@Param('id') id: string) {
		const surveyGenres = await this.surveyGenreService.getSurveysByGenreId(parseInt(id))
		return surveyGenres
	}

	// Genre ~ survey 간 연결하기. 
	@Post('/:id/surveys/:survey_id/connection')
	@Serialize(SurveyGenreDTO)
	async createSurveyGenre(@Param('id') id: string, @Param('survey_id') survey_id: string) {
		return await this.surveyGenreService.create(parseInt(survey_id), parseInt(id))
	}
}
