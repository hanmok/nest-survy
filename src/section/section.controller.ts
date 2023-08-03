import { Controller, Get, Param, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SectionDTO } from './section.dto';
import { SectionService } from './section.service';

@Serialize(SectionDTO)
@Controller('section')
export class SectionController {
	constructor(sectionService: SectionService) {}
	@Get() 
	async getAllSection() {}

	@Post()
	async createSection() {}

	@Get('/:id')
	async getSectionById(@Param('id') id: string) {}
}
