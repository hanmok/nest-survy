import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";


export class PostDto { 
	@Expose()
	@IsNumber()
	survey_id: number;

	@Expose()
	@IsNumber()
	user_id: number;
}