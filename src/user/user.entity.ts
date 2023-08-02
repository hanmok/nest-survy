import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User { 
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string

	@Column({ default: 0})
	collectedReward: number // Int


	// fatigue // INT
	// DB 에 없음. 
	// @Column({ default: 0})
	// creditAmount: number  // INT

	// birthdate // Date 보류 ; 
	
	// @Column()
	// isMale: boolean; // TinyInt

	// @Column()
	// nickname: string;
	// registeredAt DATETIME
	// nickname VARCHAR(100)
}