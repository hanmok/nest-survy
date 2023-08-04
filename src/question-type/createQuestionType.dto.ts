import { IsString } from "class-validator";


export class CreateQuestionTypeDTO { 
	@IsString()
	description: string;
}