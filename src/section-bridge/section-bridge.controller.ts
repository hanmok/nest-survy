import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { SectionBridgeService } from './section-bridge.service';
import { SectionBridgeDTO } from './SectionBridge.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from 'src/api-response.model';

import { SuccessAPIResponse } from 'src/util/success-api-response';
import { ToCamelCaseInterceptor } from 'src/interceptors/toCamelCase.interceptor';

@ApiTags('SectionBridge')
@Controller('section-bridge')
@UseInterceptors(ToCamelCaseInterceptor)
export class SectionBridgeController {
  constructor(private sectionBridgeService: SectionBridgeService) {}

  @ApiOperation({ summary: 'Create SectionBridge' })
  @Post()
  async create(@Body() body: SectionBridgeDTO) {
    const ret = await this.sectionBridgeService.create(body);
    return SuccessAPIResponse(ret, 201);
  }
}
