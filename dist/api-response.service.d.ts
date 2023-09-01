import { CustomResponseDto } from './custom-response.dto';
export declare class ApiResponseService {
    create<T>(statusCode: number, message: string, data?: T): CustomResponseDto<T>;
}
