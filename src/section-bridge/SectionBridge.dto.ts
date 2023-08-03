import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";


export class SectionBridgeDTO { 
	@Expose()
	@IsNumber() //fk
	current_id: number;

	@Expose()
	@IsNumber() //fk
	next_id: number;

	@Expose()
	@IsNumber() //fk
	question_id: number;

	@Expose()
	@IsNumber() //fk
	selectableOption_id: number;
}