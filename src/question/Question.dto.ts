import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class QuestionDTO { 
	@Expose()
	@IsNumber()
	id: number;

	@Expose()
	@IsNumber()
	questionType_id: number; // fk

	@Expose()
	@IsNumber()
	section_id: number; // fk

	@Expose()
	@IsNumber()
	position: number; 

	@Expose()
	@IsString()
	text: string;

	@Expose()
	@IsNumber()
	expectedTimeInSec: number;
}