import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDTO } from './createGenre.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GenreDto } from './genre.dto';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';
import { SurveyGenreDTO } from 'src/survey_genre/survey_genre.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessAPIResponse } from 'src/api-response.model';

@ApiTags('Genre')
@Controller('/genre')
export class GenreController {
	constructor(
		private genreService: GenreService, 
		private surveyGenreService: SurveyGenreService) {}

	@ApiOperation({summary: "Get All genres"})
	@Get()
	@Serialize(GenreDto)
	async getAllGenres() {
		const ret = this.genreService.getAll()
		return SuccessAPIResponse(ret)
	}

	@Post()
	@Serialize(GenreDto)
	async createGenre(@Body() body: CreateGenreDTO) {
		console.log(body)
		const genre = await this.genreService.create(body.name)
		return SuccessAPIResponse(genre, 201)
	}

	@Get('/:id')
	@Serialize(GenreDto)
	async getGenreById(@Param('id') id: string) {
		const genre = await this.genreService.findOne(parseInt(id))
		if (!genre) { 
			throw new NotFoundException('genre not found');
		}
		return SuccessAPIResponse(genre)
	} 


	@ApiOperation({summary: "Get All genres having specific genre "})
	@Get('/:id/surveys')
	@Serialize(SurveyGenreDTO)
	async getSurveysByGenreId(@Param('id') id: string) {
		const surveyGenres = await this.surveyGenreService.getSurveysByGenreId(parseInt(id))
		return SuccessAPIResponse(surveyGenres)
	}
}
