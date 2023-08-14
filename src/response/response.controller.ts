import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseService } from './response.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ResponseDTO } from './response.dto';
import { CreateResponseDTO } from './createResponse.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from 'src/api-response.model';

import { SuccessAPIResponse } from 'src/success-api-response';

@ApiTags('Response')
// @SerializeResponseDTO)
@Controller('response')
export class ResponseController {
  constructor(private responseService: ResponseService) {}

  // ADMIN
  @ApiOperation({ summary: 'Get all Responses' })
  @Get()
  async getAllResponses() {
    const ret = await this.responseService.getAll();
    return SuccessAPIResponse(ret);
  }

  @ApiOperation({ summary: 'Create Response' })
  @Post()
  async createResponse(@Body() body: CreateResponseDTO) {
    const ret = this.responseService.createResponse(body);
    return SuccessAPIResponse(ret, 201);
  }
}
