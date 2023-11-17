import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessAPIResponse } from '../util/success-api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateParticipationDTO } from 'src/survey/CreateParticipation.dto';
import { ParticipatingService } from './participating.service';

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
}
