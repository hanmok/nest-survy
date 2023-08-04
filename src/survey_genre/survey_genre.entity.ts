import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SurveyGenre { 
	@PrimaryColumn()
	genre_id: number; // fk

	@PrimaryColumn()
	survey_id: number; // fk
}