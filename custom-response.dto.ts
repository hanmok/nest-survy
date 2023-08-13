import { ApiProperty } from "@nestjs/swagger";

export class CustomResponseDto<T> { 
	@ApiProperty()
	statusCode: number;

	@ApiProperty()
	message: string;

	// @ApiProperty({required: false})
	@ApiProperty({required: false})
	data: T;
}