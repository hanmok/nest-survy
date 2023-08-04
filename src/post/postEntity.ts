import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class PostEntity { 
	
	@PrimaryColumn()
	survey_id: number; // fk

	@PrimaryColumn()
	user_id: number; // fk
}