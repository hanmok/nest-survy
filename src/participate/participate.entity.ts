import { PrimaryColumn } from "typeorm";


export class Participate { 
	@PrimaryColumn()
	user_id: number; //fk

	@PrimaryColumn()
	survey_id: number; // fk
}