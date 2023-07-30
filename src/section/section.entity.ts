import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Section { 
	@PrimaryGeneratedColumn()
	id: number;

	// Foreign Key
	// @Column()
	// survey_id: number;

	@Column()
	expectedTimeInSec: number;
	
	@Column()
	reward: number;

	@Column()
	title: string;	
}