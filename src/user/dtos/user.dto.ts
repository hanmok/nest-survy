import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";


export class UserDto { 
	@Expose()
	@IsNumber()
	id: number;

	@Expose()
	@IsNumber()
	collecedReward: number;

	@Expose()
	birthDate: string;

	@Expose()
	@IsNumber()
	isMale: number;

	// @Expose()
	// @IsString()
	// registeredAt: string;

	@Expose()
	@IsEmail()
	username: string;

}