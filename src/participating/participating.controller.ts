import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ParticipatingService } from './participating.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParticipatingDTO } from './participating.dto';
// import { SuccessAPIResponse } from '../api-response.model';
import { SuccessAPIResponse } from '../util/success-api-response';
import { ToCamelCaseInterceptor } from '../interceptors/toCamelCase.interceptor';

@ApiTags('Participating')
@Controller('participating')
@UseInterceptors(ToCamelCaseInterceptor)
export class ParticipatingController {
  constructor(private participatingService: ParticipatingService) {}

  @ApiOperation({ summary: 'Create Participating' })
  @Post()
  async createParticipating(@Body() body: ParticipatingDTO) {
    const participating = await this.participatingService.create(
      body.survey_id,
      body.user_id,
      body.section_id,
    );
    return SuccessAPIResponse(participating, 201);
  }
}
