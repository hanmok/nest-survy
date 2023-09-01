import { CustomApiResponse } from './api-response.model';
export declare function FailureAPIResponse<T>(statusCode?: number, message?: string, data?: T): CustomApiResponse<T>;
