import { Expose } from "class-transformer";

export class QuestionDTO { 
	@Expose()
	id: number;

	@Expose()
	questionType_id: number; // fk

	@Expose()
	section_id: number; // fk

	@Expose()
	position: number; 

	@Expose()
	text: string;

	@Expose()
	expectedTimeInSec: number;
}