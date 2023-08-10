import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SectionDTO } from './section.dto';
import { SectionService } from './section.service';
import { CreateSectionDTO } from './createSection.dto';
import { SectionBridgeService } from 'src/section-bridge/section-bridge.service';
import { CreateSectionBridgeDTO } from 'src/section-bridge/createSectionBridge.dto';
import { SectionBridgeDTO } from 'src/section-bridge/SectionBridge.dto';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Section')
@Controller('/section')
export class SectionController {
	constructor(
		private sectionService: SectionService, 
		private sectionBridgeService: SectionBridgeService) {}

	// ADMIN, Get all sections
	
	@Get() 
	@Serialize(SectionDTO)
	async getAllSection() {
		return await this.sectionService.getAllSections()
	}


	@Post()
	@Serialize(SectionDTO)
	async createSection(@Body() body: CreateSectionDTO) {
		return await this.sectionService.createSection(body)
	}

	@Get('/:id')
	@Serialize(SectionDTO)
	async getSectionById(@Param('id') id: string) {
		return await this.sectionService.findSection(parseInt(id))
	}
	
	// current_id, next_id, quesiton_id, selectableOption_id
	@Post('/connect')
	@Serialize(SectionBridgeDTO)
	async connect(@Body() body: CreateSectionBridgeDTO) {
		return await this.sectionBridgeService.create(body)
	}

	@Get('/:current_id')
	@Serialize(SectionBridgeDTO)
	async getNextSectionId(@Param('current_id') current_id: string) { 
		return await this.sectionBridgeService.getByCurrentId(parseInt(current_id))
	}

	@Get('/:id/questions') 
	async getQuestionsUsingSectionId(@Param('id') id: string) { 
		return await this.sectionService.findQuestionsBySectionId(parseInt(id))
	}
}
