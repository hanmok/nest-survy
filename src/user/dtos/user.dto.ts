import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class UserDto { 
	@Expose()
	id: number;

	// @ApiProperty({})
	@ApiProperty({
		description: "description",
		example: 'example'
	})
	@Expose()
	username: string;

	@Expose()
	collectedReward: number;

	@Expose()
	birthDate: string;

	// @Expose()
	// isMale: number;

	// @Expose()
	// @IsString()
	// registeredAt: string;
}