import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Participate { 
	@PrimaryColumn()
	user_id: number; //fk

	@PrimaryColumn()
	survey_id: number; // fk
}