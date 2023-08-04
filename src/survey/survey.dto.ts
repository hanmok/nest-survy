import { Expose } from "class-transformer";

export class SurveyDto { 
	@Expose()
	id: number;

	@Expose()
	title: string;

	@Expose()
	numOfParticipation: number;

	@Expose()
	participationGoal: number; 

	@Expose()
	reward_range: string;
}