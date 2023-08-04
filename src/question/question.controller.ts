import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuestionDTO } from './Question.dto';
import { CreateQuestionTypeDTO } from 'src/question-type/createQuestionType.dto';
import { CreateQuestionDTO } from './createQuestion.dto';

@Serialize(QuestionDTO)
@Controller('question')
export class QuestionController {
	constructor(private questionService: QuestionService) {}

	@Get()
	async getAllQuestions() {} 

	@Post() 
	async create(@Body() body: CreateQuestionDTO){
		return await this.questionService.create(body)
	}

	@Get('/:id')
	async getQuestionById(@Param('id') id: string) {
		return await this.questionService.findById(parseInt(id))
	}
}
