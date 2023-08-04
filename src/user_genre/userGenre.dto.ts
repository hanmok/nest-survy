import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";


export class UserGenreDTO { 
	@Expose()
	@IsNumber()
	user_id: number; // fk

	@Expose()
	@IsNumber()
	genre_id: number; //fk
}