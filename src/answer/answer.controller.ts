import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
// import { AnswerDTO as AnswerDTO } from './answer.dto';
import { AnswerDTO } from './answer.dto';
import { CreateAnswerDTO } from './createAnswer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from 'src/api-response.model';

import { SuccessAPIResponse } from 'src/util/success-api-response';

@ApiTags('Answer')
// @SerializeResponseDTO)
@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  // ADMIN
  // @ApiOperation({ summary: 'Get all Answers' })
  // @Get()
  // async getAllAnswers() {
  //   const ret = await this.answerService.getAll();
  //   return SuccessAPIResponse(ret);
  // }

  @ApiOperation({ summary: 'Create Answer' })
  @Post()
  async createAnswer(@Body() body: CreateAnswerDTO) {
    const ret = await this.answerService.createAnswer(body);
    return SuccessAPIResponse(ret, 201);
  }

  @ApiOperation({ summary: 'testing' })
  @Get()
  async getAnswers(
    // @Query('user_id') user_id: number,
    @Query('survey_id') survey_id: number,
  ) {
    // return await this.answerService.getAnswersByUserId(user_id, survey_id);
    return await this.answerService.getAnswerBySurveyId(survey_id);
  }
}
