import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class QuestionTypeDTO { 
	@IsNumber()
	@Expose()
	id: number;

	@IsString()
	@Expose()
	description: string;
}