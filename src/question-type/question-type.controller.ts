import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionTypeService } from './question-type.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuestionTypeDTO } from './QuestionType.dto';
import { CreateQuestionTypeDTO } from './createQuestionType.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('QuestionType')
@Serialize(QuestionTypeDTO)
@Controller('question-type')
export class QuestionTypeController {
	constructor(private questionTypeService: QuestionTypeService) {}

	@Get()
	async getAllQuestionTypes() {
		return await this.questionTypeService.getAll()
	}

	
	// @Post()
	// async createQuestionType(@Body() body: CreateQuestionTypeDTO) {
	// 	return await this.questionTypeService.create(body.description)
	// }

}
