import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateResponseDTO { 

	@IsNumber()
	question_id: number;

	@IsNumber()
	survey_id: number;

	@IsNumber()
	selectableOption_id: number;

	@IsNumber()
	user_id: number;

	@IsString()
	@IsOptional()
	answerText: string;

	@IsNumber()
	timeTookInSec: number;
}