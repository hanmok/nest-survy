import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";


export class CreateSurveyDTO { 
	@Expose()
	@IsString()
	title: string;

	@Expose()
	@IsNumber()
	participationGoal: number;
}