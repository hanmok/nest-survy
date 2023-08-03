import { PrimaryColumn } from "typeorm";

export class Survey_genre { 
	@PrimaryColumn()
	genre_id: number; // fk

	@PrimaryColumn()
	survey_id: number; // fk
}