
// class ApiResponse<T> { 
// 	constructor(public statusCode: number, public message: string, public data?: T) {}
// }

// export function createApiResponse<T>(statusCode: number, message: string, data?: T): ApiResponse<T> { 
// 	return new ApiResponse<T>(statusCode, message, data)
// }



class ApiResponse<T> { 
	constructor(public statusCode: number, public message: string, public data?: T) {}
}

export function SuccessAPIResponse<T>(data?: T, statusCode: number = 200, message: string = "success" ): ApiResponse<T> { 
	return new ApiResponse<T>(statusCode, message, data)
}

export function FailureAPIResponse<T>(data?: T, statusCode: number = 400, message: string = "failed" ): ApiResponse<T> { 
	return new ApiResponse<T>(statusCode, message, data)
}

