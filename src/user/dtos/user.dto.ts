import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";


export class UserDto { 
	@Expose()
	@IsNumber()
	id: number;

	@Expose()
	@IsEmail()
	username: string;

	@Expose()
	@IsNumber()
	collectedReward: number;

	@Expose()
	birthDate: string;

	@Expose()
	@IsNumber()
	isMale: number;

	// @Expose()
	// @IsString()
	// registeredAt: string;
}