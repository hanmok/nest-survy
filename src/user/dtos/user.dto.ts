import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";


export class UserDto { 
	@Expose()
	id: number;

	@Expose()
	username: string;

	@Expose()
	collectedReward: number;

	@Expose()
	birthDate: string;

	@Expose()
	isMale: number;

	// @Expose()
	// @IsString()
	// registeredAt: string;
}