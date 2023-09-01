import { CustomApiResponse } from 'src/util/api-response.model';
export declare function SuccessAPIResponse<T>(data?: T, statusCode?: number, message?: string): CustomApiResponse<T>;
