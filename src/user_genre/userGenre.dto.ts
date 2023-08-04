import { Expose } from "class-transformer";

export class UserGenreDTO { 
	@Expose()
	user_id: number; // fk

	@Expose()
	genre_id: number; //fk
}