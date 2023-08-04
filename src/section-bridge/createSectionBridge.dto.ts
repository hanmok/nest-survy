import { IsNumber } from "class-validator";


export class CreateSectionBridgeDTO { 
	@IsNumber()
	current_id: number;

	@IsNumber()
	next_id: number;

	@IsNumber()
	question_id: number;

	@IsNumber()
	selectableOption_id: number;
}