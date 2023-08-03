import { Controller, Get, Post } from '@nestjs/common';
import { SectionBridgeService } from './section-bridge.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SectionBridgeDTO } from './SectionBridge.dto';

@Serialize(SectionBridgeDTO)
@Controller('section-bridge')
export class SectionBridgeController {
	constructor(private sectionBridgeService: SectionBridgeService) {}
	
	@Get()
	getAllSectionBridge() {}

	@Post()
	createSectionBridge() {}
}
