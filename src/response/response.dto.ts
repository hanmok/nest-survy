import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class ResponseDTO { 
	@Expose()
	@IsNumber()
	question_id: number; // fk 
	
	@Expose()
	@IsNumber()
	survey_id: number; // fk

	@Expose()
	@IsNumber()
	selectableOption_id: number; // fk

	@Expose()
	@IsNumber()
	user_id: number; // fk

	@Expose()
	@IsString()
	answerText: string; // fk

	@Expose()
	@IsNumber()
	timeTookInSec: number;
}