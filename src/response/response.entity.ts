import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Response { 

	// three consists of Primary Key
	// question_id
	// selectableOption_id
	// user_id

	@PrimaryColumn()
	question_id: number;
	
	@PrimaryColumn()
	selectableOption_id: number;

	@PrimaryColumn()
	user_id: number;

	@Column()
	answerText: string;

	@Column()
	timeTookInSec: number;
}