import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SurveyDto } from './survey.dto';
import { SurveyService } from './survey.service';
import { CreateSurveyDTO } from './createSurvey.dto';
import { SurveyGenreService } from 'src/survey_genre/survey_genre.service';
import { PostingService } from 'src/posting/posting.service';
import { ParticipatingService } from 'src/participating/participating.service';
import { UserDto } from 'src/user/dtos/user.dto';
import { SurveyGenreDTO } from 'src/survey_genre/survey_genre.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Survey')
@Controller('/survey')
export class SurveyController {
	constructor(private surveyService: SurveyService, 
		private surveyGenreService: SurveyGenreService, 
		private postingService: PostingService, 
		private participatingService: ParticipatingService) {}
		
	// survey 생성 및 user_id 로 post 생성. 
	@Post('/create/user/:user_id')
	@Serialize(SurveyDto)
	async createSurvey(@Body() body: CreateSurveyDTO, @Param('user_id') user_id: string) {
		const survey = await this.surveyService.create(body.title, body.participationGoal)
		const _ = await this.postingService.create(survey.id, parseInt(user_id))
		return survey
	}

	// ADMIN: 모든 surveys 가져오기
	@Get()
	@Serialize(SurveyDto)
	async getAllSurveys() {
		// return this.surveyService.getAll()
		return await this.surveyService.getAvailableSurveys(false)
	}

	@Get('/available')
	@Serialize(SurveyDto) 
	async getAvailableSurveys() { 
		return await this.surveyService.getAvailableSurveys(true)
	}
	

	// @Get('/except/participated-user/:user_id')
	// async getAllSurveysExcept(user_id) {
	// 	let allSurveys = this.surveyService.getAll()
	// 	let participatedSurveys = this.participateService.getParticipatedSurveysByUserId(user_id)
	// 	allSurveys.filter { }
	// }

	// id 로 특정 survey 가져오기
	@Get('/:id') 
	@Serialize(SurveyDto)
	async getSurveyById(@Param('id') id: string) {
		// return this.surveyService.findOne(parseInt(id))
		const survey = await this.surveyService.findOne(parseInt(id))
		if (!survey) { 
			throw new NotFoundException('survey not found')
		}
		return survey
	}

	// 특정 survey 에 참여한 사람들 가져오기 (admin)
	@Serialize(UserDto)
	@Get('/:id/participated-users')
	async getParticipatedUsersBySurveyId(@Param('id') id: string) {
		return await this.participatingService.getParticipatedUsersBySurveyId(parseInt(id))
	}

	// 특정 survey 에 있는 genres 가져오기
	@Get('/:id/genres')
	@Serialize(SurveyGenreDTO)
	async getGenresBySurveyId(@Param('id') id: string) {
		return await this.surveyGenreService.getGenresBySurveyId(parseInt(id))
	}

	// survey ~ genre 연결 시키기
	@Post('/:id/genres/:genre_id/connections')
	@Serialize(SurveyGenreDTO)
	async createSurveyGenre(
		@Param('id') id: string, 
		@Param('genre_id') genre_id: string) {
		return await this.surveyGenreService.create(parseInt(id), parseInt(genre_id))
	}

	@Patch('/:id/increase_participation')
	async increateParticipatedUsers(@Param('id') id: string) { 
		return await this.surveyService.increaseParticipatedNumber(parseInt(id))

	}
}
