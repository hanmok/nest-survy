import { Expose } from "class-transformer";

export class SectionBridgeDTO { 
	@Expose()
	current_id: number; //fk

	@Expose()
	next_id: number; // fk

	@Expose()
	question_id: number; //fk

	@Expose()
	selectableOption_id: number; //fk
}