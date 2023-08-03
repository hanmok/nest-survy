import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Post { 
	
	@PrimaryColumn()
	survey_id: number; // fk

	@PrimaryColumn()
	user_id: number; // fk
}