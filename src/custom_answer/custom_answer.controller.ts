import { Controller, Get } from '@nestjs/common';
import { CustomAnswerService } from './custom_answer.service';
import { Post, Body } from '@nestjs/common';
import { CreateAnswerDTO } from '../answer/createAnswer.dto';
import { SuccessAPIResponse } from '../util/success-api-response';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomAnswerDto } from './createCustomAnswer.dto';

@ApiTags('CustomAnswer')
@Controller('/custom-answer')
export class CustomAnswerController {
  constructor(private customAnswerService: CustomAnswerService) {}

  @Post()
  async createCustomAnswer(@Body() body: CreateCustomAnswerDto) {
    const ret = await this.customAnswerService.create(body);
    return SuccessAPIResponse(ret);
  }

  @Get()
  async getAllCustomAnswer() {
    const ret = await this.customAnswerService.getAll();
    return ret;
  }
}
