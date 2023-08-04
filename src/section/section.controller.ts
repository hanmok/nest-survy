import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SectionDTO } from './section.dto';
import { SectionService } from './section.service';
import { CreateSectionDTO } from './createSection.dto';
import { SectionBridgeService } from 'src/section-bridge/section-bridge.service';
import { CreateSectionBridgeDTO } from 'src/section-bridge/createSectionBridge.dto';

@Serialize(SectionDTO)
@Controller('/section')
export class SectionController {
	constructor(
		private sectionService: SectionService, 
		private sectionBridgeService: SectionBridgeService) {}

	@Get() 
	async getAllSection() {
		return await this.sectionService.getAllSections
	}

	@Post()
	async createSection(@Body() body: CreateSectionDTO) {
		// const section = this.repo.create(body)
		await this.sectionService.createSection(body)
	}

	@Get('/:id')
	async getSectionById(@Param('id') id: string) {
		return await this.sectionService.findSection(parseInt(id))
	}

	@Post('/connect')
	async connect(@Body() body: CreateSectionBridgeDTO) {
		return await this.sectionBridgeService.create(body)
	}

	@Get('/:current_id')
	async getNextSectionId(@Param('current_id') current_id: string) { 
		return await this.sectionBridgeService.getByCurrentId(parseInt(current_id))
	}
}
