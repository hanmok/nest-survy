import { Controller, Get, Post } from '@nestjs/common';

@Controller('response')
export class ResponseController {
	
	@Get()
	async getAllResponses() {} 

	@Post()
	async createResponse() {}

}
