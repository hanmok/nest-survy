import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class selectableOption {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	question_id: number;

	@Column()
	position: number;

	@Column()
	value: string;

	@Column()
	placeholder: string;
	
}