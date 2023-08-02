import { Controller, Get, Post } from '@nestjs/common';

@Controller('question')
export class QuestionController {

	@Get()
	async getAllQuestions() {} 

	@Post()
	async createQuestion() {}

	@Get('/:id')
	async getQuestionById() {}
	
}
