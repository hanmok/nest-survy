import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class selectableOptionDTO { 
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