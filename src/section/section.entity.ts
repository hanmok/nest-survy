import { Survey } from 'src/survey/survey.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Section { 
	@PrimaryGeneratedColumn()
	id: number;

	// Foreign Key
	// @Column()
	@OneToOne(() => Survey)
	@JoinColumn()
	survey_id: number;

	@Column()
	expectedTimeInSec: number;
	
	@Column()
	reward: number;

	@Column()
	title: string;	
}