import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class selectableOptionDTO { 
	@Expose()
	@IsNumber()
	id: number;

	@Expose()
	@IsNumber()
	question_id: number; // fk
	
	@Expose()
	@IsNumber()
	position: number; 

	@Expose()
	@IsString()
	value: string;

	@Expose()
	@IsString()
	@IsOptional()
	placeholder: string;
}