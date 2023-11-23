import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { QuestionDTO } from './Question.dto';

import { CreateQuestionDTO } from './createQuestion.dto';
import { SelectableOptionDTO } from '../selectable-option/selectable-option.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SuccessAPIResponse } from '../util/api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';

@ApiTags('Question')
@Controller('question')
@UseInterceptors(ToCamelCaseInterceptor)
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @ApiOperation({ summary: 'Get All Questions' })
  @Get()
  // @SerializeQuestionDTO)
  async getAllQuestions() {
    const ret = await this.questionService.getAll();
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Create Question' })
  @Post()
  // @UsePipes(ValidateQuestionTypePipe)
  async create(@Body() body: CreateQuestionDTO) {
    const question = await this.questionService.create(body);
    return SuccessAPIResponse(question, 201);
  }

  @ApiOperation({ summary: 'Get Question by id' })
  @Get('/:id')
  // @SerializeQuestionDTO)
  async getQuestionById(@Param('id') id: string) {
    const ret = await this.questionService.findById(parseInt(id));
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Get all Selectable options by question id' })
  @Get(':id/selectable-options')
  // @SerializeSelectableOptionDTO)
  async getSelectableOptionsByQuestionId(@Param('id') id: string) {
    const ret = await this.questionService.getSelectableOptionsByCurrentId(
      parseInt(id),
    );

    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Get all answers by question id' })
  @Get('/:id/answers')
  async getAnswersByQuestionId(@Param('id') id: string) {
    const ret = await this.questionService.getAnswersByQuestionId(parseInt(id));
    return SuccessAPIResponse(ret);
  }
}
