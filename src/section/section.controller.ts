import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SectionDTO } from './section.dto';
import { SectionService } from './section.service';
import { CreateSectionDTO } from './createSection.dto';
import { SectionBridgeService } from 'src/section-bridge/section-bridge.service';
import { CreateSectionBridgeDTO } from 'src/section-bridge/createSectionBridge.dto';
import { SectionBridgeDTO } from 'src/section-bridge/SectionBridge.dto';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessAPIResponse } from 'src/api-response.model';

@ApiTags('Section')
@Controller('/section')
export class SectionController {
	constructor(
		private sectionService: SectionService, 
		private sectionBridgeService: SectionBridgeService) {}

	// ADMIN, Get all sections
	@ApiOperation({summary: "Get All sections, 'ADMIN' "})
	@Get() 
	@Serialize(SectionDTO)
	async getAllSection() {
		const ret = await this.sectionService.getAllSections()
		return SuccessAPIResponse(ret)
	}


	@Post()
	@Serialize(SectionDTO)
	async createSection(@Body() body: CreateSectionDTO) {
		const ret = await this.sectionService.createSection(body)
		return SuccessAPIResponse(ret, 201)
	}

	@Get('/:id')
	@Serialize(SectionDTO)
	async getSectionById(@Param('id') id: string) {
		const ret = await this.sectionService.findSection(parseInt(id))
		return SuccessAPIResponse(ret)
	}
	
	// current_id, next_id, quesiton_id, selectableOption_id
	// @Post('/connect')
	// @Serialize(SectionBridgeDTO)
	// async connect(@Body() body: CreateSectionBridgeDTO) {
	// 	return await this.sectionBridgeService.create(body)
	// }

	@ApiOperation({summary: 'Get next section by current section id'})
	@Get('/:current_id/next')
	@Serialize(SectionBridgeDTO)
	async getNextSectionId(@Param('current_id') current_id: string) { 
		const ret = await this.sectionBridgeService.getByCurrentId(parseInt(current_id))
		return SuccessAPIResponse(ret)
	}

	@ApiOperation({summary: "Get all questions using current section id"})
	@Get('/:id/questions') 
	async getQuestionsUsingSectionId(@Param('id') id: string) { 
		const ret = await this.sectionService.findQuestionsBySectionId(parseInt(id))
		return SuccessAPIResponse(ret)
	}
}
