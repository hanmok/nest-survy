import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class QuestionType { 
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	description: string;
}