import { IsNumber, IsString } from "class-validator";


export class CreateSurveyDTO { 
	@IsString()
	title: string;

	@IsNumber()
	participationGoal: number;
}