import { Body, Controller, Post } from '@nestjs/common';
import { SectionBridgeService } from './section-bridge.service';
import { SectionBridgeDTO } from './SectionBridge.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from 'src/api-response.model';

import { SuccessAPIResponse } from 'src/success-api-response';

@ApiTags('SectionBridge')
@Controller('section-bridge')
export class SectionBridgeController {
  constructor(private sectionBridgeService: SectionBridgeService) {}

  @ApiOperation({ summary: 'Create SectionBridge' })
  @Post()
  async create(@Body() body: SectionBridgeDTO) {
    const ret = await this.sectionBridgeService.create(body);
    return SuccessAPIResponse(ret, 201);
  }
}
