import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class UserGenre { 
	@PrimaryColumn()
	user_id: number;

	@PrimaryColumn()
	genre_id: number;
}