import { Controller, Get, Post } from '@nestjs/common';
import { SelectableOptionService } from './selectable-option.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { selectableOptionDTO } from './selectable-option.dto';

@Serialize(selectableOptionDTO)
@Controller('selectable-option')
export class SelectableOptionController {
	constructor(private selectableOptionService: SelectableOptionService) {}

	@Get()
	getAllSelectableOptions() {}

	@Post()
	createSelectableOption() {}
}
