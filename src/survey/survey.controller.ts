import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
import { SectionService } from 'src/section/section.service';
import { FailureAPIResponse } from 'src/failure-api-response';

@ApiTags('Survey')
@Controller('/survey')
export class SurveyController {
  constructor(
    private sectionService: SectionService,
    private surveyService: SurveyService,
    private surveyGenreService: SurveyGenreService,
    private postingService: PostingService,
    private participatingService: ParticipatingService,
    private transactionService: TransactionService,
  ) {}

  @ApiOperation({ summary: 'Create survey' })
  @Post()
  async create(@Body() body: CreateSurveyDTO) {
    const ret = await this.transactionService.createSurvey(
      body.title,
      body.participationGoal,
      body.user_id,
    );
    return SuccessAPIResponse(ret, 201);
  }

  // ADMIN: 모든 surveys 가져오기
  @ApiOperation({ summary: "Get all surveys, 'ADMIN'" })
  @Get()
  // @SerializeSurveyDto)
  async getAllSurveys() {
    // return this.surveyService.getAll()
    const ret = await this.surveyService.getAvailableSurveys(false);
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Get all sections by survey id' })
  @Get('/:id/sections')
  async getSectionsBySurveyId(@Param('id') id: string) {
    const ret = this.sectionService.findSectionBySurveyId(parseInt(id));
    return SuccessAPIResponse(ret);
  }

  // TODO: user_id 이용해서 posting 한 것들 여기서 제거해야함
  @ApiOperation({ summary: 'Get available surveys only' })
  @Get('/available')
  // @SerializeSurveyDto)
  async getAvailableSurveys() {
    const ret = await this.surveyService.getAvailableSurveys(true);
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Get survey by id' })
  @Get('/:id')
  // @SerializeSurveyDto)
  async getSurveyById(@Param('id') id: string) {
    // return this.surveyService.findOne(parseInt(id))
    const survey = await this.surveyService.findOne(parseInt(id));
    if (!survey) {
      throw new NotFoundException('survey not found');
    }
    return SuccessAPIResponse(survey);
  }

  // 특정 survey 에 참여한 사람들 가져오기 (admin)
  // @SerializeUserDto)
  @ApiOperation({ summary: 'Get participated-users by survey id' })
  @Get('/:id/participated-users')
  async getParticipatedUsersBySurveyId(@Param('id') id: string) {
    const ret = await this.participatingService.getParticipatedUsersBySurveyId(
      parseInt(id),
    );
    return SuccessAPIResponse(ret);
  }

  // 특정 survey 에 있는 genres 가져오기
  @ApiOperation({ summary: 'Get all related genre ids by survey id' })
  @Get('/:id/genres')
  // @SerializeSurveyGenreDTO)
  async getGenresBySurveyId(@Param('id') id: string) {
    const ret = await this.surveyGenreService.getGenresBySurveyId(parseInt(id));
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Increase the number of participated-user by 1' })
  @Patch('/:id/increase-participation')
  async increateParticipatedUsers(@Param('id') id: string) {
    const ret = await this.surveyService.increaseParticipatedNumber(
      parseInt(id),
    );
    return SuccessAPIResponse(ret);
  }
}
