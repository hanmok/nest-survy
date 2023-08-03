import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";


export class GenreDto { 
	@Expose()
	@IsString()
	name: string;

	@Expose()
	@IsNumber()
	id: number;
}