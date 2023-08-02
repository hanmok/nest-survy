import { Controller, Get, Post } from '@nestjs/common';

@Controller('section')
export class SectionController {
	@Get() 
	async getAllSection() {}

	@Post()
	async createSection() {}

	@Get('/:id')
	async getSectionById() {}

	
	
}
