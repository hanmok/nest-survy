import { Question } from 'src/question/question.entity';
import { selectableOption } from 'src/selectable-option/selectable-option.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Response { 

	// three consists of Primary Key
	// question_id
	// selectableOption_id
	// user_id

	@PrimaryColumn()
	@OneToOne(() => Question)
	@JoinColumn()
	question_id: number;
	
	@PrimaryColumn()
	@OneToOne(() => selectableOption)
	@JoinColumn()
	selectableOption_id: number;

	@PrimaryColumn()
	@OneToOne(() => User)
	@JoinColumn()
	user_id: number;

	@Column()
	answerText: string;

	@Column()
	timeTookInSec: number;
}