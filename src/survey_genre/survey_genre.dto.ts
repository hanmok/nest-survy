import { Expose } from "class-transformer";

export class SurveyGenreDTO { 
	@Expose()
	genre_id: number;

	@Expose()
	survey_id: number;
}