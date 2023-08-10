import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Survey { 

	@PrimaryGeneratedColumn()
	id: number;

	@Column({default: 0})
	numOfParticipation : number;

	@Column()
	participationGoal: number

	@Column()
	title: string;

	@Column()
	reward_range: string;

	@Column()
	is_completed: number;

	@Column()
	code: string;

	// @Column()
	// created_at

	// @Column()
	// ended_at

	
}