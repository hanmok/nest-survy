export class CustomApiResponse<T> {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: T,
  ) {}
}

export function SuccessAPIResponse<T>(
  data?: T,
  statusCode: number = 200,
  message: string = 'success',
): CustomApiResponse<T> {
  return new CustomApiResponse<T>(statusCode, message, data);
}

export function FailureAPIResponse<T>(
  message: string = 'failed',
  statusCode: number = 400,
  data?: T,
): CustomApiResponse<T> {
  return new CustomApiResponse<T>(statusCode, message, data);
}
