import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseService } from './response.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ResponseDTO } from './response.dto';
import { CreateResponseDTO } from './createResponse.dto';

@Serialize(ResponseDTO)
@Controller('response')
export class ResponseController {
	constructor(private responseService: ResponseService) {}

	// ADMIN
	@Get()
	async getAllResponses() {
		return await this.responseService.getAll()
	}

	@Post()
	async createResponse(@Body() body: CreateResponseDTO) {
		return this.responseService.createResponse(body)
	}
}
