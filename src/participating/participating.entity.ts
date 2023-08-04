import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Participating { 
	@PrimaryColumn()
	user_id: number; //fk

	@PrimaryColumn()
	survey_id: number; // fk
}