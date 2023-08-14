import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionTypeService } from './question-type.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuestionTypeDTO } from './QuestionType.dto';
import { CreateQuestionTypeDTO } from './createQuestionType.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from 'src/api-response.model';

import { SuccessAPIResponse } from 'src/success-api-response';

@ApiTags('QuestionType')
// @SerializeQuestionTypeDTO)
@Controller('question-type')
export class QuestionTypeController {
  constructor(private questionTypeService: QuestionTypeService) {}

  @ApiOperation({ summary: 'Get all Question Types' })
  @Get()
  async getAllQuestionTypes() {
    const ret = await this.questionTypeService.getAll();
    return SuccessAPIResponse(ret);
  }

  // @Post()
  // async createQuestionType(@Body() body: CreateQuestionTypeDTO) {
  // 	return await this.questionTypeService.create(body.description)
  // }
}
