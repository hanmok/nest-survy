import { Body, Controller, Post } from '@nestjs/common';
import { ParticipatingService } from './participating.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParticipatingDTO } from './participating.dto';
// import { SuccessAPIResponse } from 'src/api-response.model';
import { SuccessAPIResponse } from 'src/success-api-response';

@ApiTags('Participating')
@Controller('participating')
export class ParticipatingController {
	constructor(private participatingService: ParticipatingService) {}

	@ApiOperation({summary: "Make Participating"})
	@Post()
	async createParticipating(@Body() body: ParticipatingDTO) { 
		const participating = await this.participatingService.create(body.survey_id, body.user_id)
		return SuccessAPIResponse(participating, 201)
	}
}
