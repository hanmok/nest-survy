import { CustomApiResponse } from './api-response.model';

export function FailureAPIResponse<T>(
  statusCode: number = 400,
  message: string = 'failed',
  data?: T,
): CustomApiResponse<T> {
  return new CustomApiResponse<T>(statusCode, message, data);
}
