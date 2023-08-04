import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
	@Expose()
	@IsNumber()
	id: number;

	@Expose()
	@IsEmail()
	username: string;

	@IsString()
	password: string;
}