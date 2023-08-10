import { IsEmail, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDTO {

	@ApiProperty({
		description: "username description",
		example: 'username example'
	})
	@IsEmail()
	username: string;

	@ApiProperty({
		description: "password description",
		example: 'password example'
	})
	@IsString()
	password: string;
}