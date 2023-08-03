import { Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuestionDTO } from './Question.dto';

@Serialize(QuestionDTO)
@Controller('question')
export class QuestionController {
	constructor(private questionService: QuestionService) {}

	@Get()
	async getAllQuestions() {} 

	@Post()
	async createQuestion() {}

	@Get('/:id')
	async getQuestionById() {}
	
}
