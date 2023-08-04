import { Expose } from "class-transformer";

export class GenreDto { 
	@Expose()
	name: string;

	@Expose()
	id: number;
}