import { Expose } from "class-transformer";


export class ParticipatingDTO { 
	@Expose()
	user_id: number;

	@Expose()
	survey_id: number;
}