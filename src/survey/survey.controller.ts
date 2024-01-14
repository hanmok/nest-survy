import { QuestionService } from './../question/question.service';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { Serialize } from '../interceptors/serialize.interceptor';
import { SurveyDto } from './survey.dto';
import { SurveyService } from './survey.service';
import { CreateSurveyDTO } from './createSurvey.dto';
import { SurveyGenreService } from '../survey_genre/survey_genre.service';
import { PostingService } from '../posting/posting.service';
import { ParticipatingService } from '../participating/participating.service';
import { UserDto } from '../user/dtos/user.dto';
import { SurveyGenreDTO } from '../survey_genre/survey_genre.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SuccessAPIResponse } from '../util/api-response';
import { TransactionService } from '../transaction/transaction.service';
import { SectionService } from '../section/section.service';
// import { FailureAPIResponse } from '../util/failure-api-response';
import { FailureAPIResponse } from '../util/api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';
import { CreateWholeSurveyDTO } from './createWholeSurvey.dto';
import { CreateParticipationDTO } from './CreateParticipation.dto';
import { ResultService } from 'src/result/result.service';

@ApiTags('Survey')
@Controller('/survey')
@UseInterceptors(ToCamelCaseInterceptor)
export class SurveyController {
  constructor(
    private sectionService: SectionService,
    private surveyService: SurveyService,
    private surveyGenreService: SurveyGenreService,
    private postingService: PostingService,
    private participatingService: ParticipatingService,
    private transactionService: TransactionService,
    private questionService: QuestionService,
    private resultService: ResultService,
  ) {}

  @ApiOperation({ summary: 'Create Whole Survey' })
  @Post('/whole')
  async createWholeSurvey(@Body() body: CreateWholeSurveyDTO) {
    console.log(`hi, whole api called`);
    const ret = await this.transactionService.createWholeSurvey(body);
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Participate' })
  @Post('/participated')
  async participate(@Body() body: CreateParticipationDTO) {
    const ret = await this.transactionService.participateToSurvey(body);
    return SuccessAPIResponse(ret);
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

  @Get('/:id/sheet')
  async getResult(@Param('id') id: string) {
    const ret = await this.resultService.exportExcel(parseInt(id));
    return SuccessAPIResponse(ret);
  }

  @Get('/bycode')
  async getSurveyByCode(@Query('code') code: string) {
    const survey = await this.surveyService.findOneByCode(code);
    if (survey !== null) {
      return SuccessAPIResponse(survey);
    }
    return FailureAPIResponse();
  }

  @ApiOperation({ summary: 'Get all sections by survey id' })
  @Get('/:id/sections')
  async getSectionsBySurveyId(@Param('id') id: string) {
    const ret = this.sectionService.findSectionBySurveyId(parseInt(id));
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Get all questions by survey id' })
  @Get('/:id/questions')
  async getQuestionsBySurveyId(@Param('id') id: string) {
    const ret = await this.questionService.findBySurveyId(parseInt(id));
    return SuccessAPIResponse(ret);
  }

  // TODO: user_id 이용해서 posting 한 것들 여기서 제거해야함
  @ApiOperation({ summary: 'Get available surveys only' })
  @Get('/available/user/:id')
  // @SerializeSurveyDto)
  async getAvailableSurveys(@Param('id') id: string) {
    const ret = await this.surveyService.getAvailableSurveys(
      true,
      parseInt(id),
    );
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Get survey by id' })
  @Get('/:id')
  // @SerializeSurveyDto)
  async getSurveyById(@Param('id') id: string) {
    // return this.surveyService.findOne(parseInt(id))
    const survey = await this.surveyService.findOneById(parseInt(id));
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

  @ApiOperation({ summary: 'add initial section id' })
  @Patch('/:id/add-initial-section/:section_id')
  async addInitialSectionId(
    @Param('id') id: string,
    @Param('section_id') section_id: string,
  ) {
    const ret = await this.surveyService.addInitialSectionId(
      parseInt(id),
      parseInt(section_id),
    );
    return SuccessAPIResponse(ret);
  }
}
