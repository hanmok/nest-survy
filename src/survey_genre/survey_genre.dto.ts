import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";


export class survey_genreDTO { 
	@Expose()
	@IsNumber()
	genre_id: number;

	@Expose()
	@IsNumber()
	survey_id: number;
}