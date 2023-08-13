import { CustomApiResponse } from "./api-response.model";


export function FailureAPIResponse<T>(data?: T, statusCode: number = 400, message: string = "failed" ): CustomApiResponse<T> { 
	return new CustomApiResponse<T>(statusCode, message, data)
}
