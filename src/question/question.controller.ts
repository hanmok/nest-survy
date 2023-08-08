import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuestionDTO } from './Question.dto';
import { CreateQuestionTypeDTO } from 'src/question-type/createQuestionType.dto';
import { CreateQuestionDTO } from './createQuestion.dto';
import { SelectableOptionDTO } from 'src/selectable-option/selectable-option.dto';


@Controller('question')
export class QuestionController {
	constructor(private questionService: QuestionService) {}

	// ADMIN
	@Get()
	@Serialize(QuestionDTO)
	async getAllQuestions() {
		return await this.questionService.getAll()
	} 

	@Post() 
	@Serialize(QuestionDTO)
	async create(@Body() body: CreateQuestionDTO){
		return await this.questionService.create(body)
	}

	@Get('/:id')
	@Serialize(QuestionDTO)
	async getQuestionById(@Param('id') id: string) {
		return await this.questionService.findById(parseInt(id))
	}

	@Get(':question_id/selectable-options')
	@Serialize(SelectableOptionDTO)
	async getSelectableOptionsByQuestionId(@Param('question_id') question_id: string) { 
		return await this.questionService.getSelectableOptionsByCurrentId(parseInt(question_id))
	}

	@Get('/:question_id/responses')
	async getResponsesByQuestionId(@Param('question_id') question_id: string) { 
		return await this.questionService.getResponsesByQuestionId(parseInt(question_id))
	}
}
