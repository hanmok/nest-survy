

export class CustomApiResponse<T> { 
	constructor(
		public statusCode: number, 
		public message: string, 
		public data?: T) {}
}


// export function SuccessAPIResponse<T>(data?: T, statusCode: number = 200, message: string = "success" ): MyApiResponse<T> { 
// 	return new MyApiResponse<T>(statusCode, message, data)
// }

// export function FailureAPIResponse<T>(data?: T, statusCode: number = 400, message: string = "failed" ): MyApiResponse<T> { 
// 	return new MyApiResponse<T>(statusCode, message, data)
// }

// export MyApiResponse;