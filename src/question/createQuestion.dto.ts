import { IsNumber, IsString, isNumber } from "class-validator";


export class CreateQuestionDTO { 
	@IsNumber()
	questionType_id: number;

	@IsNumber()
	section_id: number;

	@IsNumber()
	position: number;

	@IsString()
	text: string;

	@IsNumber()
	expectedTimeInSec: number;
}