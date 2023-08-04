import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSelectableOptionDTO { 
	@IsNumber()
	id: number;

	@IsNumber()
	question_id: number; // fk
	
	@IsNumber()
	position: number; 

	@IsString()
	value: string;

	@IsString()
	@IsOptional()
	placeholder: string;
}
