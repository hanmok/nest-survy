import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SelectableOptionService } from './selectable-option.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SelectableOptionDTO } from './selectable-option.dto';
import { CreateSelectableOptionDTO } from './createSelectableOption.dto';
import { ApiTags } from '@nestjs/swagger';
// import { SuccessAPIResponse } from 'src/api-response.model';

import { SuccessAPIResponse } from 'src/success-api-response';

@ApiTags('SelectableOption')
// @SerializeSelectableOptionDTO)
@Controller('selectable-option')
export class SelectableOptionController {
	constructor(private selectableOptionService: SelectableOptionService) {}

	@Get()
	async getAllSelectableOptions() {
		const ret = await this.selectableOptionService.adminFindAll()
		return SuccessAPIResponse(ret)
	}

	// 이거 여기있으면 안될 것 같은데? Question 으로 가야지. 
	// @Get('/questions/:question_id')
	// async findByQuestionId(@Param('question_id') question_id: string) { 
	// 	return await this.selectableOptionService.findByQuestionId(question_id)
	// }

	@Post()
	async createSelectableOption(@Body() body: CreateSelectableOptionDTO) {
		const ret = await this.selectableOptionService.create(body)
		return SuccessAPIResponse(ret, 201)
	}
}
