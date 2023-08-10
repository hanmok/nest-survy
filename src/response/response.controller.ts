import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseService } from './response.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ResponseDTO } from './response.dto';
import { CreateResponseDTO } from './createResponse.dto';
import { ApiTags } from '@nestjs/swagger';
import { SuccessAPIResponse } from 'src/api-response.model';

@ApiTags('Response')
@Serialize(ResponseDTO)
@Controller('response')
export class ResponseController {
	constructor(private responseService: ResponseService) {}

	// ADMIN
	@Get()
	async getAllResponses() {
		const ret = await this.responseService.getAll()
		return SuccessAPIResponse(ret)
	}

	@Post()
	async createResponse(@Body() body: CreateResponseDTO) {
		const ret = this.responseService.createResponse(body)
		return SuccessAPIResponse(ret, 201)
	}
}
