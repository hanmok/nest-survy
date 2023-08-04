import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
	@IsNumber()
	id: number;

	@IsEmail()
	username: string;

	@IsString()
	password: string;
}