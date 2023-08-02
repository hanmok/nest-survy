import { Question } from "src/question/question.entity";
import { Section } from "src/section/section.entity";
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class SectionBridge { 
	@PrimaryColumn()
	@OneToOne(() => Section)
	@JoinColumn()
	current_id: number;

	@PrimaryColumn()
	@OneToOne(() => Section)
	@JoinColumn()
	next_id: number;

	
	@PrimaryColumn()
	@OneToOne(() => Question)
	@JoinColumn()
	question_id: number;

	@PrimaryColumn()
	selectableOption_id: number;
}