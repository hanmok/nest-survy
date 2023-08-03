import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class SurveyDto { 
	@Expose()
	@IsNumber()
	id: number;

	@Expose()
	@IsString()
	title: string;

	@Expose()
	@IsNumber()
	numOfParticipation: number;

	@Expose()
	@IsNumber()
	participationGoal: number; 

	@Expose()
	@IsString()
	reward_range: string;
}