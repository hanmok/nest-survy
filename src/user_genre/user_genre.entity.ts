import { PrimaryColumn } from "typeorm";


export class User_genre { 
	@PrimaryColumn()
	user_id: number;

	@PrimaryColumn()
	genre_id: number;
}

