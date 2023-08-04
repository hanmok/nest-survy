import { Expose } from "class-transformer";

export class ResponseDTO { 
	@Expose()
	question_id: number; // fk 
	
	@Expose()
	survey_id: number; // fk

	@Expose()
	selectableOption_id: number; // fk

	@Expose()
	user_id: number; // fk

	@Expose()
	answerText: string; // fk

	@Expose()
	timeTookInSec: number;
}