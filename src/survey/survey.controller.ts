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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from 'src/api-response.model';

import { SuccessAPIResponse } from 'src/success-api-response';
import { TransactionService } from 'src/transaction/transaction.service';

@ApiTags('Survey')
@Controller('/survey')
export class SurveyController {
	constructor(private surveyService: SurveyService, 
		private surveyGenreService: SurveyGenreService, 
		private postingService: PostingService, 
		private participatingService: ParticipatingService, 
		private transactionService: TransactionService
		) {}

	@Post()
	// @SerializeSurveyDto)
	async create(@Body() body: CreateSurveyDTO) {
		const ret = await this.surveyService.create(body.title, body.participationGoal)
		return SuccessAPIResponse(ret, 201)
	}

	// ADMIN: 모든 surveys 가져오기
	@Get()
	// @SerializeSurveyDto)
	async getAllSurveys() {
		// return this.surveyService.getAll()
		const ret = await this.surveyService.getAvailableSurveys(false)
		return SuccessAPIResponse(ret)
	}

	@Get('/available')
	// @SerializeSurveyDto) 
	async getAvailableSurveys() { 
		const ret = await this.surveyService.getAvailableSurveys(true)
		return SuccessAPIResponse(ret)
	}

	// id 로 특정 survey 가져오기
	@Get('/:id') 
	// @SerializeSurveyDto)
	async getSurveyById(@Param('id') id: string) {
		// return this.surveyService.findOne(parseInt(id))
		const survey = await this.surveyService.findOne(parseInt(id))
		if (!survey) { 
			throw new NotFoundException('survey not found')
		}
		return SuccessAPIResponse(survey)
	}

	// 특정 survey 에 참여한 사람들 가져오기 (admin)
	// @SerializeUserDto)
	@Get('/:id/participated-users')
	async getParticipatedUsersBySurveyId(@Param('id') id: string) {
		const ret = await this.participatingService.getParticipatedUsersBySurveyId(parseInt(id))
		return SuccessAPIResponse(ret)
	}

	// 특정 survey 에 있는 genres 가져오기
	@Get('/:id/genres')
	// @SerializeSurveyGenreDTO)
	async getGenresBySurveyId(@Param('id') id: string) {
		const ret = await this.surveyGenreService.getGenresBySurveyId(parseInt(id))
		return SuccessAPIResponse(ret)
	}


	@Patch('/:id/increase-participation')
	async increateParticipatedUsers(@Param('id') id: string) { 
		const ret = await this.surveyService.increaseParticipatedNumber(parseInt(id))
		return SuccessAPIResponse(ret)
	}
}
