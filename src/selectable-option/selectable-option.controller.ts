import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SelectableOptionService } from './selectable-option.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SelectableOptionDTO } from './selectable-option.dto';
import { CreateSelectableOptionDTO } from './createSelectableOption.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from 'src/api-response.model';

import { SuccessAPIResponse } from 'src/util/success-api-response';

@ApiTags('SelectableOption')
// @SerializeSelectableOptionDTO)
@Controller('selectable-option')
export class SelectableOptionController {
  constructor(private selectableOptionService: SelectableOptionService) {}

  @ApiOperation({ summary: 'Get all selectable-options' })
  @Get()
  async getAllSelectableOptions() {
    const ret = await this.selectableOptionService.adminFindAll();
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Create selectable-option' })
  @Post()
  async createSelectableOption(@Body() body: CreateSelectableOptionDTO) {
    const ret = await this.selectableOptionService.create(body);
    return SuccessAPIResponse(ret, 201);
  }
}
