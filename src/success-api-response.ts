import { CustomApiResponse } from 'src/api-response.model';


export function SuccessAPIResponse<T>(data?: T, statusCode: number = 200, message: string = "success" ): CustomApiResponse<T> { 
	return new CustomApiResponse<T>(statusCode, message, data)
}


