import { Expose } from "class-transformer";

export class SelectableOptionDTO { 
	@Expose()
	id: number;

	@Expose()
	question_id: number; // fk
	
	@Expose()
	position: number; 

	@Expose()
	value: string;

	@Expose()
	placeholder: string;
}