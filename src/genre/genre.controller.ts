import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './createGenre.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GenreDto } from './genre.dto';
import { UserGenreService } from 'src/user_genre/user_genre.service';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';
import { UserDto } from 'src/user/dtos/user.dto';
import { SurveyDto } from 'src/survey/survey.dto';
import { survey_genreDTO } from 'src/survey_genre/survey_genre.dto';
import { UserGenreDTO } from 'src/user_genre/userGenre.dto';


@Controller('/genre')
export class GenreController {
	constructor(
		private genreService: GenreService, 
		private userGenreService: UserGenreService, 
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

	
	// 보류. 
	@Get('/:genre_id/surveys')
	@Serialize(SurveyDto)
	async getSurveysByGenreId(@Param('genre_id') genre_id: string) {
		const surveyGenres = await this.surveyGenreService.getSurveysByGenreId(parseInt(genre_id))
		
	}

	@Post('/:genre_id/surveys/:survey_id')
	@Serialize(survey_genreDTO)
	async createSurveyGenre(@Param('genre_id') genre_id: string, @Param('survey_id') survey_id: string) {
		return await this.surveyGenreService.create(parseInt(survey_id), parseInt(genre_id))
	}	

	@Post('/:genre_id/user/:user_id')
	@Serialize(UserGenreDTO)
	async createUserGenre(@Param('genre_id') genre_id: string, @Param('user_id') user_id: string) {
		return await this.userGenreService.create(parseInt(user_id), parseInt(genre_id))
	}	
}
