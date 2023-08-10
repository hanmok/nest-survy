import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuestionDTO } from './Question.dto';
import { CreateQuestionTypeDTO } from 'src/question-type/createQuestionType.dto';
import { CreateQuestionDTO } from './createQuestion.dto';
import { SelectableOptionDTO } from 'src/selectable-option/selectable-option.dto';
import { ApiTags } from '@nestjs/swagger';
import { SuccessAPIResponse } from 'src/api-response.model';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
	constructor(private questionService: QuestionService) {}

	// ADMIN
	@Get()
	@Serialize(QuestionDTO)
	async getAllQuestions() {
		const ret = await this.questionService.getAll()
		return SuccessAPIResponse(ret)
	} 

	@Post() 
	@Serialize(QuestionDTO)
	async create(@Body() body: CreateQuestionDTO){
		const question = await this.questionService.create(body)
		return SuccessAPIResponse(question, 201)
	}

	@Get('/:id')
	@Serialize(QuestionDTO)
	async getQuestionById(@Param('id') id: string) {
		const ret = await this.questionService.findById(parseInt(id))
		return SuccessAPIResponse(ret)
	}

	@Get(':id/selectable-options')
	@Serialize(SelectableOptionDTO)
	async getSelectableOptionsByQuestionId(@Param('id') id: string) { 
		const ret = await this.questionService.getSelectableOptionsByCurrentId(parseInt(id))

		return SuccessAPIResponse(ret)
	}

	@Get('/:id/responses')
	async getResponsesByQuestionId(@Param('id') id: string) { 
		const ret = await this.questionService.getResponsesByQuestionId(parseInt(id))

		return SuccessAPIResponse(ret)
	}
}
