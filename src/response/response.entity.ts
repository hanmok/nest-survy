import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Response { 

	// three consists of Primary Key
	// question_id
	// selectableOption_id
	// user_id

	@Column()
	answerText: string;

	@Column()
	timeTookInSec: number;
}