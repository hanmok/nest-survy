import { Expose } from "class-transformer"
import { IsNumber, IsString } from "class-validator";

export class SectionDTO { 

	@Expose()
	@IsNumber()
	id: number;

	@Expose()
	@IsNumber()
	survey_id: number;

	@Expose()
	@IsString()
	title: string;

	@Expose()
	@IsNumber()
	expectedTimeInSec: number;

	@Expose()
	@IsNumber()
	reward: number;

	@Expose()
	@IsNumber()
	sequence: number;
}