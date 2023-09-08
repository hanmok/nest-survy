// // api-response.service.ts
// import { Injectable } from '@nestjs/common';
// import { CustomResponseDto } from './custom-response.dto';

// @Injectable()
// export class ApiResponseService {
//     create<T>(statusCode: number, message: string, data?: T): CustomResponseDto<T> {
//         return {
//             statusCode,
//             message,
//             data,
//         };
//     }
// }
