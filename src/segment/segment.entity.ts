import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Segment { 
	@PrimaryColumn()
	id: number;

	@Column()
	name: string;
}