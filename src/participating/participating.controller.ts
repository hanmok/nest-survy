import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ParticipatingService } from './participating.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParticipatingDTO } from './participating.dto';
// import { SuccessAPIResponse } from '../api-response.model';
import { SuccessAPIResponse } from '../util/success-api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateParticipationDTO } from 'src/survey/CreateParticipation.dto';

@ApiTags('Participating')
@Controller('participating')
@UseInterceptors(ToCamelCaseInterceptor)
export class ParticipatingController {
  constructor(
    private participatingService: ParticipatingService,
    private transactionService: TransactionService,
  ) {}

  @ApiOperation({ summary: 'Create Participating' })
  @Post()
  // async createParticipating(@Body() body: ParticipatingDTO) {
  async createParticipating(@Body() body: CreateParticipationDTO) {
    // const participating = await this.participatingService.create(
    //   body.survey_id,
    //   body.user_id,
    // );
    const sth = await this.transactionService.participateToSurvey(body);

    return SuccessAPIResponse(sth, 201);
  }
}
