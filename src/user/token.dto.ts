import { Expose } from "class-transformer";
import { IsString } from "class-validator";


export class TokenDTO { 
	@Expose()
	accessToken: string;

	@Expose()
	refreshToken: string;
}