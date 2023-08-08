import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question { 
	@PrimaryGeneratedColumn()
	id: number;

	@Column()

	@Column()
	position: number;

	// Optional
	@Column()
	text: string;

	@Column()
	expectedTimeInSec: number;

	// @Column()
	// correctAnswer: number;

	// Foreign Keys
	@Column()
	questionType_id: number;
	
	@Column()
	section_id: number;
}