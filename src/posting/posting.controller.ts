import { Controller, Body, Post } from '@nestjs/common';
import { PostingService } from './posting.service';
import { PostingDTO } from './posting.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Posting')
@Controller('/posting')
export class PostingController {
	constructor(private postingService: PostingService) {}

	// @ApiOperation({summary: 'Get all surveys posted by the user'})
	// @Get('/:id/posted-surveys')
	// // @Serialize(SurveyDto)
	// @Serialize(PostingDTO)
	// async getPostedSurveys(@Param('id') id: string) {
	// 	return await this.postingService.getPostedSurveysByUserId(parseInt(id))
	// } 

	// Survey 만든 후 바로 호출되어야 하겠는데..? 
	@ApiOperation({summary: 'Make Posting'})
	@Post()
	async createPosting(@Body() body: PostingDTO) {
		return await this.postingService.create(body.survey_id, body.user_id)
	}
}
