import { Expose } from "class-transformer";

import { CustomApiResponse } from "./api-response.model";

export class CustomResponse<T> { 
	@Expose()
	statusCode: number;

	@Expose()
	message: string;

	@Expose()
	data?: T;

	// @Expose()
	// response: CustomApiResponse<T>
}

