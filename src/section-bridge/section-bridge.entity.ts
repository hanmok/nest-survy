import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SectionBridge { 
	@PrimaryColumn()
	current_id: number;

	@PrimaryColumn()
	next_id: number;

	@PrimaryColumn()
	question_id: number;

	@PrimaryColumn()
	selectableOption_id: number;
}