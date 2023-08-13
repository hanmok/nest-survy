// import { CustomResponse } from 'src/api-custom-response.dto';


// import { Injectable } from '@nestjs/common';
// // import { CustomResponseDto } from './custom-response.dto';
// import { CustomResponseDto } from './custom-response.dto';

// @Injectable()
// export class ApiResponseService {
//     create<T>(
//         statusCode: number,
//         message: string,
//         data?: T,
//     ): CustomResponseDto<T> {
//         return {
//             statusCode,
//             message,
//             data,
//         };
//     }
// }

// api-response.service.ts
import { Injectable } from '@nestjs/common';
import { CustomResponseDto } from './custom-response.dto';

@Injectable()
export class ApiResponseService {
    create<T>(statusCode: number, message: string, data?: T): CustomResponseDto<T> {
        return {
            statusCode,
            message,
            data,
        };
    }
}

