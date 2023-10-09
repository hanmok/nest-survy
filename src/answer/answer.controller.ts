import { UseInterceptors } from '@nestjs/common';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Serialize } from '../interceptors/serialize.interceptor';
// import { AnswerDTO as AnswerDTO } from './answer.dto';
import { AnswerDTO } from './answer.dto';
import { CreateAnswerDTO } from './createAnswer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from '../api-response.model';

import { SuccessAPIResponse } from '../util/success-api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';

@ApiTags('Answer')
@Controller('/answer')
@UseInterceptors(ToCamelCaseInterceptor)
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @ApiOperation({ summary: 'Create Answer' })
  @Post()
  async createAnswer(@Body() body: CreateAnswerDTO) {
    const ret = await this.answerService.createAnswer(body);
    return SuccessAPIResponse(ret, 201);
  }

  @ApiOperation({ summary: 'Create Answers' })
  @Post('/multiple')
  async createAnswers(@Body() body: CreateAnswerDTO[]) {
    const promises = Array.from(body).map(async (answerBody) => {
      await this.answerService.createAnswer(answerBody);
    });
    await Promise.all(promises);
    // const ret = await this.answerService.createAnswer(body);
    // return SuccessAPIResponse(201);
    return SuccessAPIResponse();
  }

  @ApiOperation({ summary: 'testing' })
  @Get()
  async getAnswers(@Query('survey_id') survey_id: number) {
    // return await this.answerService.getAnswersByUserId(user_id, survey_id);
    return await this.answerService.getAnswerBySurveyId(survey_id);
  }
}
