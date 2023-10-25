import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessAPIResponse } from '../util/success-api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateParticipationDTO } from 'src/survey/CreateParticipation.dto';

@ApiTags('Participating')
@Controller('participating')
@UseInterceptors(ToCamelCaseInterceptor)
export class ParticipatingController {
  constructor(private transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Create Participating' })
  @Post()
  async createParticipating(@Body() body: CreateParticipationDTO) {
    const sth = await this.transactionService.participateToSurvey(body);

    return SuccessAPIResponse(sth, 201);
  }
}
