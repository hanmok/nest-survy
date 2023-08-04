import { Expose } from "class-transformer"

export class SectionDTO { 
	@Expose()
	id: number;

	@Expose()
	survey_id: number;

	@Expose()
	title: string;

	@Expose()
	expectedTimeInSec: number;

	@Expose()
	reward: number;

	@Expose()
	sequence: number;
}