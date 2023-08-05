import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseService } from './response.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ResponseDTO } from './response.dto';
import { CreateResponseDTO } from './createResponse.dto';

@Serialize(ResponseDTO)
@Controller('response')
export class ResponseController {
	constructor(private responseService: ResponseService) {}

	@Get('/survey/:survey_id/question/:question_id')
	async getResponse(
		@Param('survey_id') survey_id: number, 
		@Param('question_id') question_id: number) { 
		return await this.responseService.getResponse(survey_id, question_id)
	}

	@Post()
	async createResponse(@Body() body: CreateResponseDTO) {
		return this.responseService.createResponse(body)
	}
}
