import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class SurveyGenreDTO { 
	@ApiProperty()
	@Expose()
	genre_id: number;

	@ApiProperty()
	@Expose()
	survey_id: number;
}