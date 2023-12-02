import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { WithdrawalBody, WithdrawalService } from './withdrawal.service';
import { SuccessAPIResponse } from 'src/util/api-response';
import logObject from 'src/util/logObject';

@Controller('withdrawal')
export class WithdrawalController {
  constructor(private withdrawalService: WithdrawalService) {}

  @Post()
  async create(@Body() body: WithdrawalBody) {
    console.log('hi');
    const withdrawal = await this.withdrawalService.create(body);
    logObject('returning withdrawal', withdrawal);
    return SuccessAPIResponse(withdrawal);
  }

  // Prod: Auth 에서만 가능해야함.

  @Patch('/:id')
  async approve(@Param('id') id: string) {
    console.log('hi');
    const withdrawal = await this.withdrawalService.approve(parseInt(id));
    return SuccessAPIResponse(withdrawal);
  }

  @Get('/user/:user_id')
  async getByUserId(id: number) {
    const withdrawals = await this.withdrawalService.getByUserId(id);
    return SuccessAPIResponse(withdrawals);
  }
}
