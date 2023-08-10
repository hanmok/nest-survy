import { Expose } from "class-transformer";

export class PostingDTO { 
	@Expose()
	survey_id: number;

	@Expose()
	user_id: number;
}