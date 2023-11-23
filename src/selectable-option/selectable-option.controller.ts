import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SelectableOptionService } from './selectable-option.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { SelectableOptionDTO } from './selectable-option.dto';
import { CreateSelectableOptionDTO } from './createSelectableOption.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from '../api-response.model';

import { SuccessAPIResponse } from '../util/api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';

@ApiTags('SelectableOption')
// @SerializeSelectableOptionDTO)
@Controller('selectable-option')
@UseInterceptors(ToCamelCaseInterceptor)
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
