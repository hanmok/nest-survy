import { Body, Controller, Post } from '@nestjs/common';
import { ParticipatingService } from './participating.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParticipatingDTO } from './participating.dto';

@ApiTags('Participating')
@Controller('participating')
export class ParticipatingController {
	constructor(private participatingService: ParticipatingService) {}

	@ApiOperation({summary: "Make Participating"})
	@Post()
	async createParticipating(@Body() body: ParticipatingDTO) { 
		return await this.participatingService.create(body.survey_id, body.user_id)
	}
}
