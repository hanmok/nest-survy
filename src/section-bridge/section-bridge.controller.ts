import { Body, Controller, Post } from '@nestjs/common';
import { SectionBridgeService } from './section-bridge.service';
import { SectionBridgeDTO } from './SectionBridge.dto';
import { ApiTags } from '@nestjs/swagger';
import { SuccessAPIResponse } from 'src/api-response.model';

@ApiTags('SectionBridge')
@Controller('section-bridge')
export class SectionBridgeController {
	constructor(private sectionBridgeService: SectionBridgeService) {}

	@Post()
	async create(@Body() body: SectionBridgeDTO) {
		const ret = await this.sectionBridgeService.create(body)
		return SuccessAPIResponse(ret, 201)
	}
}
