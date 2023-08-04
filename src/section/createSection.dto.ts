import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateSectionDTO { 
	@IsNumber()
	survey_id: number;

	@IsString()
	title: string;

	@IsNumber()
	@IsOptional()
	expectedTimeInSec: number;

	@IsNumber()
	@IsOptional()
	reward: number;

	@IsNumber()
	sequence: number;
}
