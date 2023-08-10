import { Body, Controller, Post } from '@nestjs/common';
import { SectionBridgeService } from './section-bridge.service';
import { SectionBridgeDTO } from './SectionBridge.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SectionBridge')
@Controller('section-bridge')
export class SectionBridgeController {
	constructor(private sectionBridgeService: SectionBridgeService) {}

	@Post()
	async create(@Body() body: SectionBridgeDTO) {
		await this.sectionBridgeService.create(body)
	}
}
