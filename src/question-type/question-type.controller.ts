import { Controller, Get, Post } from '@nestjs/common';
import { QuestionTypeService } from './question-type.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuestionTypeDTO } from './QuestionType.dto';

@Serialize(QuestionTypeDTO)
@Controller('question-type')
export class QuestionTypeController {
	constructor(private questionTypeService: QuestionTypeService) {}
	@Get()
	getAllQuestionTypes() {}

	@Post()
	createQuestionType() {}
}
