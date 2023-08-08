import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

	@IsEmail()
	username: string;

	@IsString()
	password: string;
}