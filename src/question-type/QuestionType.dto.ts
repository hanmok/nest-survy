import { Expose } from "class-transformer";

export class QuestionTypeDTO { 
	@Expose()
	id: number;

	@Expose()
	description: string;
}