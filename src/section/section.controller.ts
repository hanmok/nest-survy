import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { SectionDTO } from './section.dto';
import { SectionService } from './section.service';
import { CreateSectionDTO } from './createSection.dto';
import { SectionBridgeService } from '../section-bridge/section-bridge.service';
import { CreateSectionBridgeDTO } from '../section-bridge/createSectionBridge.dto';
import { SectionBridgeDTO } from '../section-bridge/SectionBridge.dto';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SuccessAPIResponse } from '../util/api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';

@ApiTags('Section')
@Controller('/section')
@UseInterceptors(ToCamelCaseInterceptor)
export class SectionController {
  constructor(
    private sectionService: SectionService,
    private sectionBridgeService: SectionBridgeService,
  ) {}

  // ADMIN, Get all sections
  @ApiOperation({ summary: "Get All sections, 'ADMIN' " })
  @Get()
  // @SerializeSectionDTO)
  async getAllSection() {
    const ret = await this.sectionService.getAllSections();
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Create Section' })
  @Post()
  // @SerializeSectionDTO)
  async createSection(@Body() body: CreateSectionDTO) {
    const ret = await this.sectionService.createSection(body);
    return SuccessAPIResponse(ret, 201);
  }

  @ApiOperation({ summary: 'Get section by id' })
  @Get('/:id')
  // @SerializeSectionDTO)
  async getSectionById(@Param('id') id: string) {
    const ret = await this.sectionService.findSection(parseInt(id));
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Get next section by current section id' })
  @Get('/:current_id/next')
  // @SerializeSectionBridgeDTO)
  async getNextSectionId(@Param('current_id') current_id: string) {
    const ret = await this.sectionBridgeService.getByCurrentId(
      parseInt(current_id),
    );
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Get all questions by section id' })
  @Get('/:id/questions')
  async getQuestionsUsingSectionId(@Param('id') id: string) {
    const ret = await this.sectionService.findQuestionsBySectionId(
      parseInt(id),
    );
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Get all selectable-option by section id' })
  @Get('/:id/selectable-options')
  async getSelectableOptionsUsingSectionId(@Param('id') id: string) {
    const ret = await this.sectionService.findSelectableOptionsBySectionId(
      parseInt(id),
    );
    return SuccessAPIResponse(ret);
  }
}
