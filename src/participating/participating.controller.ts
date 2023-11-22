import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessAPIResponse } from '../util/success-api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateParticipationDTO } from 'src/survey/CreateParticipation.dto';
import { ParticipatingService } from './participating.service';
import logObject from 'src/util/logObject';

@ApiTags('Participating')
@Controller('/participating')
@UseInterceptors(ToCamelCaseInterceptor)
export class ParticipatingController {
  constructor(
    private transactionService: TransactionService,
    private participatingService: ParticipatingService,
  ) {}

  @ApiOperation({ summary: 'Create Participating' })
  @Post()
  async createParticipating(@Body() body: CreateParticipationDTO) {
    const sth = await this.transactionService.participateToSurvey(body);
    return SuccessAPIResponse(sth, 201);
  }

  @ApiOperation({ summary: "Get user's participated survey " })
  @Get('/user/:id/participated-surveys')
  async getParticipatedSurveys(@Param('id') id: string) {
    const ret =
      await this.participatingService.getParticipatedSurveyIdsByUserId(
        parseInt(id),
      );
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'modify is_honest ' })
  @Patch('/user/:user_id/survey/:survey_id')
  async patchParticipating(
    @Param('user_id') user_id: string,
    @Param('survey_id') survey_id: string,
    @Body() body: { is_honest: boolean },
  ) {
    const ret = await this.participatingService.patchParticipating(
      parseInt(user_id),
      parseInt(survey_id),
      body.is_honest ? 1 : 0,
    );
    logObject('participating patch', ret);

    return SuccessAPIResponse(ret);
  }
}
