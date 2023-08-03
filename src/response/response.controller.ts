import { Controller, Get, Post } from '@nestjs/common';
import { ResponseService } from './response.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ResponseDTO } from './response.dto';

@Serialize(ResponseDTO)
@Controller('response')
export class ResponseController {
	constructor(private responseService: ResponseService) {}
	
	@Get()
	async getAllResponses() {} 

	@Post()
	async createResponse() {}

}
