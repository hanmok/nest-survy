import { IsNumber, IsString, isNumber } from "class-validator";


export class CreateQuestionDTO { 
	@IsNumber()
	questionType_id: number; 

	// questionType_id, section_id 는 어떻게 알아? 
	@IsNumber()
	section_id: number; 

	@IsNumber()
	position: number;

	@IsString()
	text: string;

	@IsNumber()
	expectedTimeInSec: number;
}