import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";


export class ParticipateDTO { 
	@Expose()
	@IsNumber()
	user_id: number;

	@Expose()
	@IsNumber()
	survey_id: number;
}